import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';

import { AboutPage } from '../about/about';
import { SchedulePage } from '../schedule/schedule';
import { SpeakerListPage } from '../speaker-list/speaker-list';

@Component({
  templateUrl: 'tabs-page.html'
})
export class TabsPage {
  // set the root pages for each tab
  tab1Root: any = SchedulePage;
  tab2Root: any = SpeakerListPage;
  tab4Root: any = AboutPage;
  mySelectedIndex: number;
  eventSlug: string;

  constructor(navParams: NavParams) {
    this.eventSlug = navParams.get('eventSlug');
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }

}
