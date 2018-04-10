import { Component } from '@angular/core';
import { Platform, IonicPage, NavController, NavParams } from 'ionic-angular';

import { CommonProvider } from '../../../providers/common/common';
import { EndpointProvider } from '../../../providers/endpoint/endpoint';

@IonicPage()
@Component({
 selector: 'page-notifications-list',
  templateUrl: 'notifications-list.html',
})
export class NotificationsListPage {

	notifications: any = [];

  constructor( platform: Platform,
  						 public navCtrl: NavController, 
  						 public navParams: NavParams,
               private commonProvider: CommonProvider,
               private endpointProvider: EndpointProvider) {

  	platform.ready().then(() => {
      platform.registerBackButtonAction(() => {
        this.back();
      });
    });
  }

  back(){
    this.navCtrl.setRoot('HomePage', {}, { animate: true, direction: 'back' });
  }

  ionViewDidLoad() {
    this.getData();
  }

  getData(){
    let loading = this.commonProvider.loading();
    this.endpointProvider.get('incomes').subscribe(resp =>{
      loading.dismiss();
      this.notifications = resp['response'];
    }, err =>{
      loading.dismiss();
    });
  }

  showNotification(item){
    this.navCtrl.setRoot("NotificationDetailsPage", { notification: item }, { animate: true, direction: 'forward' });
  }
}
