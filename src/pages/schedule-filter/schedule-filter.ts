import { Component } from '@angular/core';

import { NavParams, ViewController } from 'ionic-angular';

import { ConferenceData } from '../../providers/conference-data';


@Component({
  selector: 'page-schedule-filter',
  templateUrl: 'schedule-filter.html'
})
export class ScheduleFilterPage {
  tracks: Array<{name: string, isChecked: boolean, color: string}> = [
  ];

  constructor(
    public confData: ConferenceData,
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
    this.loadAreas();
  }

  loadAreas() {
    const data = this.navParams.get('areas');
    const keys = Object.keys(data);
    keys.sort((key1: string, key2: string) => {
      return key1.localeCompare(key2);
    });
    keys.forEach((areaName) => {
      this.tracks.push({
        name: areaName,
        color: data[areaName].color,
        isChecked: true,
      });
    });
  }

  resetFilters() {
    this.tracks.forEach(track => {
      track.isChecked = true;
    });
  }

  applyFilters() {
    let excludedTrackNames = this.tracks.filter(c => !c.isChecked).map(c => c.name);
    this.dismiss(excludedTrackNames);
  }

  dismiss(data?: any) {
    this.viewCtrl.dismiss(data);
  }
}
