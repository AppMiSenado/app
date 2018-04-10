import { Component } from '@angular/core';
import { Platform, IonicPage, NavController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { CommonProvider } from '../../providers/common/common';
import { FirebaseProvider } from '../../providers/firebase/firebase';

@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {

  form: any = {};

  constructor( platform: Platform,
  						 private navCtrl: NavController,
               private commonProvider: CommonProvider,
               private iab: InAppBrowser,
               private firebaseProvider: FirebaseProvider) {

  	platform.ready().then(() => {
      platform.registerBackButtonAction(() => {
        this.navCtrl.setRoot('HomePage', {}, { animate: true, direction: 'back' });
      });
    });
  }

  doSend(){
  	this.firebaseProvider.changePassword(this.form.email);
  }

  validateEmail(email){
    return this.commonProvider.validateEmail(email);
  }

  goToLink(url){
    this.iab.create(url, "_blank");
  }

}
