import { OfStorage } from './of-storage';
import { ItemOfService, ActionTypes, ConnectionTypes } from './of-service.models';
import { Subject } from 'rxjs/Rx';
import { EventEmitter, Injectable } from '@angular/core';
import { Network } from '@ionic-native/network';

import { ServerService } from '@pluritech/server-service';

/*
  Generated class for the OfServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OfServiceProvider {

  public connectionType$: EventEmitter<string> = new EventEmitter<string>();
  public progressSync$: Subject<number> = new Subject<number>();

  private _isConnected: boolean;

  constructor(
    private network: Network,
    private serverService: ServerService,
    private ofStorage: OfStorage
  ) {
      this._initObservables();
    }

  public isConnected(): boolean {
    return true;
  }

  public getFromServer(item: ItemOfService): Promise<any> {
    const idKey = item.keyId;
    return this.serverService.get(item.pathServer, item.params)
      .then(data => {
        if (item.isList) {
          return this.ofStorage.updateCollectionFromServer(item.type, item.keyData, data, idKey)
            .then(() => this.ofStorage.getCollectionAsList(item.type));
        } else {
          return this.ofStorage.patchLocal(data, item.type, idKey)
            .then(() => {
              const id = item.keyData ? data[item.keyData][idKey] : data[idKey];
              return this.ofStorage.getCollection(item.type, id);
            });
        }
      })
  }

  public getLocal(item: ItemOfService): Promise<any> {
    if(item.isList) {
      return this.ofStorage.getCollectionAsList(item.type);
    } else {
      return this.ofStorage.getCollection(item.type, item.idSearch);
    }
  }

  public dispatchGet(item: ItemOfService): Promise<any> {
    if (this._canGetServer() && item.pathServer && item.connectionType !== ConnectionTypes.ONLY_LOCAL) {
      return this.getFromServer(item)
        .catch(() => {
          return this.getLocal(item);
        });
    } else {
      return this.getLocal(item);
    }
  }

  public dispatch(item: ItemOfService): Promise<any> {
    if (!item.connectionType) {
      item.connectionType = ConnectionTypes.BOTH;
    }
    
    if (item.action !==  ActionTypes.GET) {
      this._generateHash(item.object);
    }
    
    const idKey = item.keyId;
    let actionPromise: Promise<any>;

    switch (item.action) {
      case ActionTypes.GET:
        return this.dispatchGet(item);
      case ActionTypes.POST:
        actionPromise = this.ofStorage.postLocal(item.object, item.type);
        break;
      case ActionTypes.DELETE:
        actionPromise = this.ofStorage.deleteLocal(item.object, item.type, idKey);
        break;
      case ActionTypes.PUT:
        actionPromise = this.ofStorage.patchLocal(item.object, item.type, idKey);
        break;
      case ActionTypes.PATCH:
        actionPromise = this.ofStorage.patchLocal(item.object, item.type, idKey);
        break;
    }

    return actionPromise.then(() => {
      this._addItemToSync(item);
    });
  }

  private _addItemToSync(item: ItemOfService) {
    if (!item.pathServer) {
      return;
    }
    this.ofStorage.addItemToSync(item)
      .then(() => {
        if (item.connectionType !== ConnectionTypes.ONLY_LOCAL) {
          this.sync();
        }
      })
      .catch(error => console.error('_addItemToSync', error));
  }

  public sync(): void {
    if(this.isConnected()) {
      this.ofStorage.getStorageApp()
        .then(storageApp => this._syncOrder(storageApp.toSync, storageApp.toSync.length));
    }
  }

  public getItemsToSync(): Promise<ItemOfService[]> {
    return this.ofStorage.getStorageApp().then((storageApp) => {
      return storageApp.toSync;
    });
  }

  private _syncOrder(listToSync: ItemOfService[], totalSync: number, listToSyncError: ItemOfService[] = []) {
    this.calcProgressSync(listToSync.length, totalSync);
    if(listToSync.length <= 0) {
      listToSync = listToSync.concat(listToSyncError);
      this.ofStorage.updateListToSync(listToSync);
      return listToSync;
    }
    const itemToSync = listToSync.shift();
    this._sync(itemToSync)
    .catch(error => {
      const keepList = this._handleErrorSync(itemToSync, error);
      if (keepList) {
        itemToSync.errorSync = error;
        listToSyncError.push(itemToSync);
      }
    })
    .then(() => this._syncOrder(listToSync, totalSync, listToSyncError));
  }

  // return true wether this item should keep in list to sync.
  private _handleErrorSync(itemToSync: ItemOfService, errorSync: any): boolean {
    let error = 500;
    if (errorSync && errorSync.errorRaw && errorSync.errorRaw.status) {
      error = errorSync.errorRaw.status;
    }
    switch(error) {
      case 404:
        this.ofStorage.deleteLocal(itemToSync.object, itemToSync.type, itemToSync.keyId, false);
        return false;
      default:
        return true;
    }
  }

  private calcProgressSync(currentLength, totalLength) {
    let progressPercent = 0;
    if(currentLength === 0) {
      progressPercent = 100;
    } else if(totalLength != currentLength) {
      progressPercent = ((totalLength - currentLength) / totalLength) * 100;
    }
    this.progressSync$.next(progressPercent);
  }

  private _sync(item: ItemOfService): Promise<any> {
    switch(item.action) {
      case ActionTypes.POST:
        return this.serverService.post(item.pathServer, item.object);
      case ActionTypes.DELETE:
        return this.serverService.delete(item.pathServer)
          .then(() => this.ofStorage.deleteLocal(item.object, item.type, item.keyId, false));
      case ActionTypes.PUT:
        return this.serverService.put(item.pathServer, item.object);
      case ActionTypes.PATCH:
        return this.serverService.patch(item.pathServer, item.object);
    }
  }

  private _initObservables() {
    this._initWatchingStateConnection();
  }

  private _initWatchingStateConnection() {
    this.network.onConnect().subscribe(() => {
      this._isConnected = true;
      setTimeout(() => {
        this.connectionType$.emit(this.network.type);
        this.sync();
      }, 3000);
    });

    this.network.onDisconnect().subscribe(() => {
      this._isConnected = false;
      this.connectionType$.emit('');
    });
  }

  private _generateHash(data: any): void {
    if (!data.hash) {
      const hash = ([1e7] as any +-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
      );
      data.hash = hash;
      }
  }

  private _canGetServer(): boolean {
    return this.isConnected() && !this.ofStorage.hasSync;
  }

}