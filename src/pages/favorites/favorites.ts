import { Component } from '@angular/core';
import { Platform, IonicPage, NavController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { StorageProvider } from '../../providers/storage/storage';
import { CommonProvider } from '../../providers/common/common';
import { EndpointProvider } from '../../providers/endpoint/endpoint';

@IonicPage()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {

	search: string = "";
	bills: any = [];

  constructor( platform: Platform,
  						 private navCtrl: NavController,
  						 private iab: InAppBrowser,
  						 private storageProvider: StorageProvider,
  						 private commonProvider: CommonProvider,
							 private endpointProvider: EndpointProvider) {

  	platform.ready().then(() => {
      platform.registerBackButtonAction(() => {
        this.navCtrl.setRoot('HomePage', {}, { animate: true, direction: 'back' });
      });
    });

    this.getBills();
  }

	onCancel(){
		this.search = "";
	}

	getBills(){
    let loading = this.commonProvider.loading();
    this.endpointProvider.get('projects')
      .subscribe(resp =>{
        loading.dismiss();
        this.bills = resp['response'].filter(item => item['favorite'] == true);
      },
      err =>{ loading.dismiss(); })
	}

	toggleFavorite(e, bill, index){
		e.preventDefault();
		e.stopPropagation();
		bill.favorite = !bill.favorite;

		this.bills.splice(index, 1);
		
		if (!this.storageProvider.get('help-remove-favorite')){
			this.commonProvider.toast('Se removió este Proyecto de ley a sus favoritos');
			this.storageProvider.set('help-remove-favorite', true)
		}

		this.endpointProvider.put('projects/favorite/'+bill.id, {}).subscribe(resp =>{},
    err =>{})
	}

	goToLink(url){
		this.iab.create(url, "_blank");
	}
}

