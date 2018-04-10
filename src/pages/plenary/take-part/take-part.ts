import { Component } from '@angular/core';
import { Platform, IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommonProvider } from '../../../providers/common/common';
import { StorageProvider } from '../../../providers/storage/storage';

@IonicPage()
@Component({
  selector: 'page-take-part',
  templateUrl: 'take-part.html',
})
export class TakePartPage {

  trustUrl: any;
  showVideo: boolean = false;
	plenary: any = {
									url: "https://www.youtube.com/watch?v=iiQSWoXFzoI"
								}

  constructor( platform: Platform,
  						 public navCtrl: NavController, 	
  						 public navParams: NavParams,
  						 private commonProvider: CommonProvider,
               private storageProvider: StorageProvider) {

  	platform.ready().then(() => {
      platform.registerBackButtonAction(() => {
        this.back();
      });
    });

    
    this.trustUrl = this.trustSrc(this.storageProvider.get('currentStreaming'));
  }

  back(){
    this.navCtrl.setRoot('HomePage', {}, { animate: true, direction: 'back' });
  }

  ionViewDidLoad() {
    this.commonProvider.alertStreaming();
  }

 	trustSrc(url){
    return this.commonProvider.trustSrc(url);
  }

  goBills(){
    this.navCtrl.setRoot('BillsListPage', {}, { animate: true, direction: 'forward' });
  }
}
