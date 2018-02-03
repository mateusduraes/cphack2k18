import { SessionDetailPage } from './../session-detail/session-detail';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-campus-attractions',
  templateUrl: 'campus-attractions.html',
})
export class CampusAttractionsPage {

  public selectedTab: any = '4';
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private alertController: AlertController) {
  }

  addAtraction() {
    this.alertController.create({
      buttons: [
        {text: 'Cancel', role: 'canel'},
        {text: 'Create attraction'}
      ],
      inputs: [
        {
          name: 'username',
          placeholder: 'Attraction name'
        },
        {
          name: 'hour',
          placeholder: 'Hour'
        },
        {
          name: 'reference',
          placeholder: 'Reference location'
        }

      ],
    }).present();
  }

  goDetail() {
    this.navCtrl.push(SessionDetailPage, {campus: true});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CampusAttractionsPage');
  }

}
