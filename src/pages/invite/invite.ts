import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

@Component({
  selector: 'page-invite',
  templateUrl: 'invite.html',
})
export class InvitePage {

  public markAll: boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private toastController: ToastController) {
  }

  toggleAll() {
    this.markAll = !this.markAll;
  }

  invite() {
    this.toastController.create({
      message: 'The selected persons has been invited',
      duration: 3000,
      closeButtonText: 'OK!',
      showCloseButton: true
    }).present();
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InvitePage');
  }

}
