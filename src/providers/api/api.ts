import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { OfServiceProvider } from '../of-service/of-service';

import { ActionTypes } from './../of-service/of-service.models';
import { environment } from '@app/env';


@Injectable()
export class ApiProvider {

  constructor(public ofService: OfServiceProvider,
    public storage: Storage) {
  }

  public setCurrentEventSlug(eventSlug: string): Promise<any> {
    return this.storage.set('current_slug', eventSlug);
  }

  public getCurrentEventSlug(): Promise<string> {
    return this.storage.get('current_slug');
  }

  public removeCurrentEventSlug(): Promise<any> {
    return this.storage.remove('current_slug');
  }

  getEventList(): Promise<any> {
    return this.ofService.dispatch({
      action: ActionTypes.GET,
      type: 'eventlist',
      keyId: 'id',
      isList: false,
      pathServer: environment.url + '/event/list/',
    }).then((result) => {
      return result.id_undefined;
    });
  }

  getEvent(eventSlug: string): Promise<any> {
    return this.ofService.dispatch({
      action: ActionTypes.GET,
      type: 'eventlist',
      keyId: 'id',
      isList: false,
      pathServer: `${environment.url}/agenda/list/${eventSlug}/`,
    }).then((result) => {
      return result.id_undefined;
    });
  }


  getSpeakersList(): Promise<any> {
    return this.ofService.dispatch({
      action: ActionTypes.GET,
      type: 'speakerslist',
      keyId: 'id',
      isList: false,
      pathServer: `${environment.url}/speaker/list`,
    }).then((result) => {
      return result.id_undefined;
    });
  }

  getSpeaker(speakerSlug: string): Promise<any> {
    return this.ofService.dispatch({
      action: ActionTypes.GET,
      type: 'speakerslist',
      keyId: 'id',
      isList: false,
      pathServer: `${environment.url}/speaker/details/${speakerSlug}/`,
    }).then((result) => {
      return result.id_undefined;
    });
  }

}
