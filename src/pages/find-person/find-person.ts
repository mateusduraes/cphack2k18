import { FindPersonDetailPage } from './../find-person-detail/find-person-detail';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-find-person',
  templateUrl: 'find-person.html',
})
export class FindPersonPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  findPerson() {
    this.navCtrl.push(FindPersonDetailPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FindPersonPage');
  }

}
