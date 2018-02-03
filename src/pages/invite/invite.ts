import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

/**
 * Generated class for the InvitePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
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
