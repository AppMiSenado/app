import { Component } from '@angular/core';
import { Platform, IonicPage, NavController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { EndpointProvider } from '../../providers/endpoint/endpoint';
import { StorageProvider } from '../../providers/storage/storage';
import { CommonProvider } from '../../providers/common/common';

@IonicPage()
@Component({
  selector: 'page-press-room',
  templateUrl: 'press-room.html',
})
export class PressRoomPage {

	search: string = "";
	links: any = [];

  constructor( platform: Platform,
  						 private navCtrl: NavController,
  						 private iab: InAppBrowser,
  						 private endpointProvider: EndpointProvider,
  						 private storageProvider: StorageProvider,
  						 private commonProvider: CommonProvider) {

  	platform.ready().then(() => {
      platform.registerBackButtonAction(() => {
        this.navCtrl.setRoot('HomePage', {}, { animate: true, direction: 'back' });
      });
    });

    this.getData();
  }

	getData(){
		let cache = this.storageProvider.getCache('pressroom-list');
    if (cache) {
      this.links = cache;
    }else{
			let loading = this.commonProvider.loading();
			this.endpointProvider.get('pressrooms').subscribe(resp => {
				loading.dismiss();
				this.links = resp['response'];
				this.storageProvider.setCache('pressroom-list', this.links);
				console.log(resp['response']);
			}, err => {
				loading.dismiss();
			})
		}
	}

	goToLink(url){
		this.iab.create(url, "_blank");
	}
}
