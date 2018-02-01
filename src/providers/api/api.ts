import { Injectable } from '@angular/core';
import { OfServiceProvider } from '../of-service/of-service';

import { ActionTypes } from './../of-service/of-service.models';
import { environment } from '@app/env';


@Injectable()
export class ApiProvider {

  constructor(public ofService: OfServiceProvider) {
  }

  getEventList(): Promise<any> {
    return this.ofService.dispatch({
      action: ActionTypes.GET,
      type: 'eventlist',
      keyId: 'id',
      isList: false,
      pathServer: environment.url + 'event/list/',
    }).then((result) => {
      return result.id_undefined;
    });
  }

}
