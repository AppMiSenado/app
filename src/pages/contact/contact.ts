import { Component } from '@angular/core';
import { Platform, IonicPage, NavController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { EndpointProvider } from '../../providers/endpoint/endpoint';
import { CommonProvider } from '../../providers/common/common';

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {

  form: any = {};

  constructor( platform: Platform,
  						 private navCtrl: NavController,
               private commonProvider: CommonProvider,
               private endpointProvider: EndpointProvider,
               private iab: InAppBrowser) {

  	platform.ready().then(() => {
      platform.registerBackButtonAction(() => {
        this.navCtrl.setRoot('HomePage', {}, { animate: true, direction: 'back' });
      });
    });
  }

  validateEmail(email){
    return this.commonProvider.validateEmail(email);
  }

  goToLink(url){
    this.iab.create(url, "_blank");
  }

  doSend(){
    let loading = this.commonProvider.loading();
    this.endpointProvider.post('contacts', this.form).subscribe(() =>{
      loading.dismiss();
      this.commonProvider.toast('Su mensaje ha sido enviado correctamente.');
    }, err =>{ 
      loading.dismiss(); 
      this.commonProvider.toast('Ha ocurrido un error. Por favor vuélvalo a intentar más tarde.');
    });
  }
}
