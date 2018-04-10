import { Component } from '@angular/core';
import { Platform, IonicPage, NavController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { StorageProvider } from '../../providers/storage/storage';
import { CommonProvider } from '../../providers/common/common';
import { AuthProvider } from '../../providers/auth/auth';
import { EndpointProvider } from '../../providers/endpoint/endpoint';

@IonicPage()
@Component({
  selector: 'page-bills',
  templateUrl: 'bills.html',
})
export class BillsPage {
  
  userType: any = {};
  isLogin: boolean = false;
	search: string = "";
	bills: any = [];
  billsFiltered: any = []

  constructor( platform: Platform,
  						 private navCtrl: NavController,
  						 private iab: InAppBrowser,
  						 private storageProvider: StorageProvider,
  						 private commonProvider: CommonProvider,
               private authProvider: AuthProvider,
							 private endpointProvider: EndpointProvider) {

  	platform.ready().then(() => {
      platform.registerBackButtonAction(() => {
        this.navCtrl.setRoot('HomePage', {}, { animate: true, direction: 'back' });
      });
    });

    this.isLogin = this.authProvider.isLogin();
    let user = this.authProvider.currentSession();

    if (user) {
      this.userType = user.type;
    }

    this.getBills();
  }

	onCancel(){
		this.search = "";
	}

	getBills(){
    let cache = this.storageProvider.getCache('bills-list');
    if (cache) {
      this.bills = cache;
      this.billsFiltered = this.bills;
    }else{
      let loading = this.commonProvider.loading();
      this.endpointProvider.get('projects')
        .subscribe(resp =>{
          loading.dismiss();
          this.bills = resp['response'];
          this.billsFiltered = this.bills;
          this.storageProvider.setCache('bills-list', this.bills);
        },
        err =>{ loading.dismiss(); })
    }
	}

	toggleFavorite(e, bill){
		e.preventDefault();
		e.stopPropagation();
		bill.favorite = !bill.favorite;

		if (!this.storageProvider.get('help-favorite')){
			this.commonProvider.toast('Se agregó este Proyecto de ley a sus favoritos');
			this.storageProvider.set('help-favorite', true)
		}

    this.storageProvider.set('bills-list', this.bills);
		this.endpointProvider.put('projects/favorite/'+bill.id, {}).subscribe(resp =>{},
    err =>{})
	}

	goToLink(url){
		this.iab.create(url, "_blank");
	}

  doSearch(term){
    let keys = 'name';
    this.billsFiltered = this.commonProvider.search(this.bills, keys, term);
  }
}
