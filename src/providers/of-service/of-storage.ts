import { environment } from '@app/env';
import { StorageApp, getKeyId, ItemOfService, getId } from './of-service.models';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

@Injectable()
export class OfStorage {

  private _KEY_STG_APP = environment.databseKey;
  public hasSync: boolean;

  constructor(private storage: Storage) {
    this._initStorage();
  }

  public addItemToSync(item: ItemOfService): Promise<any> {
    return this.getStorageApp()
      .then(storageApp => {
        storageApp.toSync.push(item);
        this.hasSync = true;
        return storageApp;
      })
      .then(storageApp => this.setStorageApp(storageApp))
      .catch(error => {throw error});
  }

  private _initStorage() {
    this.getStorageApp().then((storageApp: StorageApp) => {
      this.hasSync = storageApp.toSync.length > 0;
    });
  }

  public setKey(userId: number) {
    if (userId) {
      this._KEY_STG_APP = `${environment.databseKey}-${userId}`
    } else {
      this._KEY_STG_APP = `${environment.databseKey}`;
    }

  }

  public getStorageApp(): Promise<StorageApp> {
    return this.storage.get(this._KEY_STG_APP).then(storageApp => {
      if (!storageApp) {
        storageApp =  new StorageApp([], {});
        this.storage.set(this._KEY_STG_APP, storageApp);
      }
      return storageApp;
    });
  }

  public getCollection(type: string, id?: string, filterDeleted: boolean = true): Promise<any> {
    return this.getStorageApp()
      .then(storageApp => {
        let collection = storageApp.collection[type] || {};
        if (filterDeleted) {
          return id ? this._isNotDeleted(collection[getKeyId(id)]) : this._filterDeleted(collection);
        } else {
          return id ? collection[getKeyId(id)] : collection;
        }
      });
  }

  private _filterDeleted(collection) {
    for(const key in collection) {
      if(!this._isNotDeleted(collection[key])) {
        delete collection[key];
      }
    }
    return collection;
  }

  private _isNotDeleted(object) {
    if(!object || object.isDeleted) {
      return null;
    }
    return object;
  }

  public getCollectionAsList(type: string, filterDeleted: boolean = true): Promise<any[]> {
    return this.getCollection(type, null, filterDeleted)
      .then(dataLocal => {
        let list = []
        for(const key in dataLocal) {
            list.push(dataLocal[key])
        }
        return list;
      });
  }

  public setStorageApp(storageApp: StorageApp): Promise<any> {
    return this.storage.set(this._KEY_STG_APP, storageApp);
  }

  public setCollection(type: string, collection: any): Promise<any> {
    return this.getStorageApp()
      .then(storageApp => {
        storageApp.collection[type] = collection;
        return this.setStorageApp(storageApp);
      });
  }

  public postLocal(data: any, type: string): Promise<any> {
    return this.getStorageApp()
      .then(storageApp => {
        let collection = storageApp.collection[type] || {};
        let keyObject = getKeyId(data.hash);
        collection[keyObject] = data;
        storageApp.collection[type] = collection;
        return this.setStorageApp(storageApp);
      })
  }

  public patchLocal(data: any, type: string, idKey?: string): Promise<any> {
    if (idKey) { console.log(idKey); }
    let id = getId(data);
    return this.getCollection(type, null, false)
    .then(collection => {
        let dataLocal = collection[getKeyId(id)] || data;
        for(const key in data) {
          dataLocal[key] = data[key];
        }
        collection[getKeyId(id)] = dataLocal;
        return this.setCollection(type, collection);
      });
  }

  public deleteLocal(data: any, type: string, idKey: string, logical: boolean = true): Promise<any> {
    if (idKey) { console.log(idKey); }
    let id = getId(data);
    if (idKey) { console.log(idKey); }
    return this.getCollection(type, null, false)
      .then(collection => {
        if(logical){
          collection[getKeyId(id)].isDeleted = true;
        } else {
          delete collection[getKeyId(id)];
        }
        return this.setCollection(type, collection);
      });
  }

  public updateCollectionFromServer(type: string, keyData: string, dataServer: any, idKey: string): Promise<any> {
    if (idKey) { console.log(idKey); }
    let objCollection = {};
    dataServer[keyData].forEach(currentItem => {
      let id = getId(currentItem);
      objCollection[getKeyId(id)] = currentItem;
    });
    return this.setCollection(type, objCollection);
  }

  public updateListToSync(list: ItemOfService[]) {
    return this.getStorageApp()
      .then(storageApp => {
        storageApp.toSync = list;
        this.hasSync = list.length > 0;
        return this.setStorageApp(storageApp);
      })
  }
}