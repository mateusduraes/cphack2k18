import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { ConferenceData } from '../../providers/conference-data';

@Component({
  selector: 'page-session-detail',
  templateUrl: 'session-detail.html'
})
export class SessionDetailPage {
  session: any;
  selectedTab: string = 'about';
  checked: boolean;
  favorited: boolean;
  constructor(
    public dataProvider: ConferenceData,
    public navParams: NavParams
  ) {}

  public checkin(): void {
    this.checked = !this.checked;
  }

  public favorite(): void {
    this.favorited = !this.favorited;
  }



}
