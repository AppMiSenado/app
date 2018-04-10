import { Component } from '@angular/core';
import { Platform, IonicPage, NavController, NavParams } from 'ionic-angular';
import { EndpointProvider } from '../../../providers/endpoint/endpoint';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { LaunchNavigator } from '@ionic-native/launch-navigator';

@IonicPage()
@Component({
  selector: 'page-notification-details',
  templateUrl: 'notification-details.html',
})
export class NotificationDetailsPage {

  notification: any = {};

  constructor( platform: Platform,
  						 public navCtrl: NavController, 
  						 public navParams: NavParams,
               private endpointProvider: EndpointProvider,
               private iab: InAppBrowser,
               private launchNavigator: LaunchNavigator) {

  	platform.ready().then(() => {
      platform.registerBackButtonAction(() => {
        this.back();
      });
    });

    this.notification = this.navParams.get('notification');
  }

  back(){
    this.navCtrl.setRoot('NotificationsListPage', {}, { animate: true, direction: 'back' });
  }

  ionViewDidLoad() {
   this.openNotification();
  }

  openNotification(){
    let data = {
      whipping_id: this.notification.id
    };

    this.endpointProvider.post('open_incomes', data).subscribe(() => {
    }, err => {})
  }

  goToLink(url){
  	this.iab.create(url, "_blank");
  }

  goRoute(){
    let position = JSON.parse(this.notification.position);

    this.launchNavigator.navigate([position.lat, position.lng])
    .then(
      success => console.log('Launched navigator'),
      error => console.log('Error launching navigator', error)
    );
  }

}
