import { PersonLocationPage } from './../person-location/person-location';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-find-person-detail',
  templateUrl: 'find-person-detail.html',
})
export class FindPersonDetailPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  map() {
    this.navCtrl.push(PersonLocationPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FindPersonDetailPage');
  }

}
