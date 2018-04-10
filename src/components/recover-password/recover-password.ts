import { Component } from '@angular/core';
import { Platform, ViewController } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { CommonProvider } from '../../providers/common/common';


@Component({
  selector: 'recover-password',
  templateUrl: 'recover-password.html'
})
export class RecoverPasswordComponent {

  form: any = {};

  constructor(platform: Platform,
  					  private viewCtrl: ViewController,
              private firebaseProvider: FirebaseProvider,
              private commonProvider: CommonProvider) {

  	platform.ready().then(() => {
      platform.registerBackButtonAction(() => {
        this.dismiss();
      });
    });
  }

  dismiss(){
  	this.viewCtrl.dismiss();
  }

  validateEmail(email){
    return this.commonProvider.validateEmail(email);
  }

  doRecover(){
    this.firebaseProvider.recoverPassword(this.form.email)
  }
}
