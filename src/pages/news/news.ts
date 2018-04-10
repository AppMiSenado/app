import { Component } from '@angular/core';
import { Platform, IonicPage, NavController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { EndpointProvider } from '../../providers/endpoint/endpoint';
import { StorageProvider } from '../../providers/storage/storage';
import { CommonProvider } from '../../providers/common/common';

@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {

	search: string = "";
	news: any = [];
	newsFiltered: any = [];

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

	onCancel(){
		this.search = "";
	}

	getData(){
		let cache = this.storageProvider.getCache('news-list');
    if (cache) {
      this.news = cache;
    }else{
			let loading = this.commonProvider.loading();
			this.endpointProvider.get('news').subscribe(resp => {
				loading.dismiss();
				this.news = resp['response'];
				this.storageProvider.setCache('news-list', this.news);
				console.log(resp['response']);
			}, err => {
				loading.dismiss();
			})
		}
	}

	goToLink(url){
		this.iab.create(url, "_blank");
	}

	doSearch(term){
    let keys = 'name,published_at';
    this.newsFiltered = this.commonProvider.search(this.news, keys, term);
  }
}
