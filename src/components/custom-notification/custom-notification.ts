import { Component } from '@angular/core';
import { Platform, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'custom-notification',
  templateUrl: 'custom-notification.html'
})
export class CustomNotificationComponent {

  notification: any = {};

  constructor( platform: Platform,
  						 public navCtrl: NavController, 
  						 public navParams: NavParams) {

  	platform.ready().then(() => {
      platform.registerBackButtonAction(() => {
        this.back();
      });
    });

    this.notification = this.navParams.get('notification');
    console.log(this.notification);
  }

  back(){
    this.navCtrl.setRoot('HomePage', {}, { animate: true, direction: 'back' });
  }
}
