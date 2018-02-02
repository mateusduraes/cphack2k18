import { TabsPage } from './../tabs-page/tabs-page';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ApiProvider } from '../../providers/api/api';

/**
 * Generated class for the EventsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})
export class EventsPage {

  public events: any;
  public tabsPage = TabsPage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: ApiProvider,
    ) {}

  getEvents() {
    this.api.getEventList().then((events) => {
      console.log(events);
      this.events = events;
      for (const event of events.results) {
        event.color = 'e' + String(Math.floor(Math.random() * 10));
        console.log('slug', event.slug);
      }
    });
  }

  ionViewDidLoad() {
    this.getEvents();
  }

}
