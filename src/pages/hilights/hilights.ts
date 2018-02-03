import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-hilights',
  templateUrl: 'hilights.html',
})
export class HilightsPage {

  selectedTab: string = 'speakers';
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HilightsPage');
  }

}
