import { ApiProvider } from './../../providers/api/api';
import { Component, ViewChild } from '@angular/core';

import { AlertController, App, FabContainer, ItemSliding, List, ModalController, NavController, ToastController, LoadingController, Refresher, NavParams } from 'ionic-angular';


import { ConferenceData } from '../../providers/conference-data';
import { UserData } from '../../providers/user-data';

import { SessionDetailPage } from '../session-detail/session-detail';
import { ScheduleFilterPage } from '../schedule-filter/schedule-filter';


@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html'
})
export class SchedulePage {
  @ViewChild('scheduleList', { read: List }) scheduleList: List;

  dayIndex = 0;
  queryText = '';
  segment = 'all';
  excludeTracks: any = [];
  shownSessions: any = [];
  groups: any = [];
  confDate: string;

  public loaded: boolean;
  public showOnlyFavorites: boolean;
  public schedule: {
    time: string;
    session: any[]
  } [] = [];
  public filterDay: string;
  public groupFilterDay: string[] = [];
  public triggetDateChange: boolean;
  public areas: any = {};
  constructor(
    public alertCtrl: AlertController,
    public app: App,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public confData: ConferenceData,
    public user: UserData,
    public api: ApiProvider,
  ) {}

  ionViewDidLoad() {
    this.app.setTitle('Schedule');
    this.getEvent();
  }

  private getEvent() {
    this.api.getCurrentEventSlug()
      .then((eventSlug: string) => this.api.getEvent(eventSlug))
      .then(eventSchedule => {
        this.buildSchedule(eventSchedule);
      })
      .then(() => {
        this.loaded = true;
      })
      .catch(console.error);
  }
  
  private getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  private buildSchedule(eventSchedule: any) {
    const groupedObj = {};
    const areas = {};
    eventSchedule.results.forEach(item => {
      const time = item.start_date;
      if (item && item.interest_areas) {
        for (let area of item.interest_areas) {
          if (!areas[area.name]) {
            areas[area.name] = {
              name: area.name,
              color: this.getRandomColor(),
            }
          }
        }
      }
      if (groupedObj[time]) {
        groupedObj[time].push(item);
      } else {
        groupedObj[time] = [item];
      }
    });
    this.areas = areas;
    
    Object.keys(groupedObj).forEach((key: string) => {
      this.schedule.push({
        time: key,
        session: groupedObj[key]
      });

      const date = new Date(key);
      const day = this.mountDate(date);
      console.log('day', day);
      const finded = this.groupFilterDay.find(dayFound => dayFound === day);
      if(!finded) {
        this.groupFilterDay.push(day);
      }
    });
    const date = this.mountDate(new Date());
    this.filterDay = date;
  }

  checkDate(start_date: string): boolean {
    return this.filterDay === this.mountDate(new Date(start_date));
  }

  public toggleDates(): void {
    this.triggetDateChange = !this.triggetDateChange;
  }

  mountDate(date): string {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const formatDay = day > 10 ? day : `0${day}`;
    const formatMonth = month > 10 ? month : `0${month}`;
    return `${formatDay}/${formatMonth}`;
  }

  updateSchedule() {
    this.scheduleList && this.scheduleList.closeSlidingItems();

    this.confData.getTimeline(this.dayIndex, this.queryText, this.excludeTracks, this.segment).subscribe((data: any) => {
      this.shownSessions = data.shownSessions;
      this.groups = data.groups;
    });
  }

  presentFilter() {
    let modal = this.modalCtrl.create(ScheduleFilterPage, {areas: this.areas});
    modal.present();

    modal.onWillDismiss((data: any[]) => {
      if (data) {
        this.excludeTracks = data;
        this.updateSchedule();
      }
    });
  }

  goToSessionDetail(sessionData: any) {
    this.navCtrl.push(SessionDetailPage, { sessionId: sessionData.id, name: sessionData.name });
  }

  addFavorite(slidingItem: ItemSliding, sessionData: any) {

    if (this.user.hasFavorite(sessionData.name)) {
      this.removeFavorite(slidingItem, sessionData, 'Favorite already added');
    } else {
      this.user.addFavorite(sessionData.name);

      let alert = this.alertCtrl.create({
        title: 'Favorite Added',
        buttons: [{
          text: 'OK',
          handler: () => {
            slidingItem.close();
          }
        }]
      });
      alert.present();
    }
  }

  removeFavorite(slidingItem: ItemSliding, sessionData: any, title: string) {
    let alert = this.alertCtrl.create({
      title: title,
      message: 'Would you like to remove this session from your favorites?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            slidingItem.close();
          }
        },
        {
          text: 'Remove',
          handler: () => {
            this.user.removeFavorite(sessionData.name);
            this.updateSchedule();
            slidingItem.close();
          }
        }
      ]
    });
    alert.present();
  }

  public setFavorite(scheduleItem, event: MouseEvent): void {
    scheduleItem.isFavorite = !scheduleItem.isFavorite;
    event.stopPropagation();
    event.preventDefault();
  }

  public toggleToFavorites(): void {
    this.showOnlyFavorites = !this.showOnlyFavorites;
    console.log('this.showOnlyFavorites', this.showOnlyFavorites);
  }

  checkIfSessionHasFavorites(group): boolean {
    const hasFavorite = group.session.find(session => session.isFavorite);
    return !!hasFavorite;
  }

  openSocial(network: string, fab: FabContainer) {
    let loading = this.loadingCtrl.create({
      content: `Posting to ${network}`,
      duration: (Math.random() * 1000) + 500
    });
    loading.onWillDismiss(() => {
      fab.close();
    });
    loading.present();
  }

  doRefresh(refresher: Refresher) {
    this.confData.getTimeline(this.dayIndex, this.queryText, this.excludeTracks, this.segment).subscribe((data: any) => {
      this.shownSessions = data.shownSessions;
      this.groups = data.groups;

      // simulate a network request that would take longer
      // than just pulling from out local json file
      setTimeout(() => {
        refresher.complete();

        const toast = this.toastCtrl.create({
          message: 'Schedule have been updated.',
          duration: 3000
        });
        toast.present();
      }, 1000);
    });
  }

  canShowGroup(group): boolean {
    const hasFavorites = this.checkIfSessionHasFavorites(group);
    const checkDate = this.checkDate(group.time);
    if (this.showOnlyFavorites) {
      return hasFavorites && checkDate;
    } else {
      return checkDate;
    }
  }

  canShowSession(session): boolean {
    const isFavorite = session.isFavorite;
    const checkDate = this.checkDate(session.start_date);
    if (this.showOnlyFavorites) {
      return isFavorite && checkDate;
    } else {
      return checkDate;
    }
  }

  groupHasNoSession(group): boolean {
    if (!group || !group.session) {
      return true;
    } 
    for (let session of group.session) {
      if (this.canShowSession(session)) {
        return false;
      }
    }
    return true;
  }

}
