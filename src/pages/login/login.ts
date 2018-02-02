import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';

import { TabsPage } from '../tabs-page/tabs-page';
import { SignupPage } from '../signup/signup';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  login: UserOptions = { username: '', password: '' };
  submitted = false;

  constructor(public navCtrl: NavController, public userData: UserData) { }

  onLogin() {
    // this.userData.login(this.login.username);
    this.navCtrl.push(TabsPage);
  }

  onSignup() {
    this.navCtrl.push(SignupPage);
  }
}
