import { AuthProvider } from './../../providers/auth/auth';
import { CPOauth } from './../../models/cpbr-oauth';
import { Oauth } from 'ng2-cordova-oauth/oauth';
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
  credentials: UserOptions = { username: '', password: '' };
  submitted = false;

  constructor(
    public navCtrl: NavController,
    public userData: UserData,
    public oauth: Oauth,
    public auth: AuthProvider,
  ) { }

  onLogin() {
    // this.userData.login(this.login.username);
    this.navCtrl.push(TabsPage);
  }

  login() {
    const provider = new CPOauth({});
    
    this.oauth.logInVia(provider).then((success: any) => {
      this.auth.getAccessToken(success.code).then((access_token) => {
        console.log(access_token);
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  onSignup() {
    this.navCtrl.push(SignupPage);
  }
}
