import { Component } from '@angular/core';
import { Platform, IonicPage, NavController, NavParams, ModalController, Events } from 'ionic-angular';

import { RecoverPasswordComponent } from '../../components/recover-password/recover-password';
import { SignupComponent } from '../../components/signup/signup';
import { TermsComponent } from '../../components/terms/terms';

import { CommonProvider } from '../../providers/common/common';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { Facebook } from '@ionic-native/facebook';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  form: any = {};

  constructor( private platform: Platform,
               public navCtrl: NavController, 
               public navParams: NavParams,
               private commonProvider: CommonProvider,
               private firebaseProvider: FirebaseProvider,
               private modalCtrl: ModalController,
               private fb: Facebook,
               private events: Events) {

    this.backButton();
    this.fb.logout();
    this.events.publish("UPDATE_SIDE_MENU", true);

    let self = this;
    $(document).on('click', '.terms', function(e){
      e.preventDefault()
      e.stopPropagation();
      self.goTerms();
    })
  }

  backButton(){
    this.platform.ready().then(() => {
      this.platform.registerBackButtonAction(() => {
        return false;
      });
    });
  }

  validateEmail(email){
    return this.commonProvider.validateEmail(email);
  }

  doLogin(){
    this.firebaseProvider.login(this.form.email, this.form.password)
  }

  loginFacebook(){
    this.firebaseProvider.network('facebook');
  }

  loginTwitter(){
    this.firebaseProvider.network('twitter');
  }

  goRecover(){
    let modalRecover = this.modalCtrl.create(RecoverPasswordComponent);
    modalRecover.onDidDismiss(() => {
      this.backButton();
    })
    modalRecover.present();
  }

  goSignup(){
    let modalSignup = this.modalCtrl.create(SignupComponent);
    modalSignup.onDidDismiss(() => {
      this.backButton();
    })
    modalSignup.present();
  }

  goHome(){
    this.navCtrl.setRoot('HomePage', { animation: true, direction: 'forward'});
  }


  goTerms(){
    let modalTerms = this.modalCtrl.create(TermsComponent);
    modalTerms.present();
  }
}