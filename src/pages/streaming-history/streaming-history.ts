import { Component } from '@angular/core';
import { Platform, IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommonProvider } from '../../providers/common/common';
import { StorageProvider } from '../../providers/storage/storage';
import { EndpointProvider } from '../../providers/endpoint/endpoint';

@IonicPage()
@Component({
  selector: 'page-streaming-history',
  templateUrl: 'streaming-history.html',
})
export class StreamingHistoryPage {

  trustUrl: any;
	activeUrl: string;
	links: any = [];

  constructor( platform: Platform,
  						 public navCtrl: NavController, 	
  						 public navParams: NavParams,
  						 private commonProvider: CommonProvider,
               private storageProvider: StorageProvider,
               private endpointProvider: EndpointProvider) {

  	platform.ready().then(() => {
      platform.registerBackButtonAction(() => {
        this.navCtrl.setRoot('HomePage', {}, { animate: true, direction: 'back' });
      });
    });
  }

  ionViewDidLoad() {
    this.getStreaming();
  }

  
  getStreaming(){
    let cache = this.storageProvider.getCache('streaming-list');

    if (cache) {
      this.links = cache;
      this.activeFirstLink(this.links);
    }else{ 
      let loading = this.commonProvider.loading();
      this.endpointProvider.get('plenaries')
      .subscribe(resp =>{
        loading.dismiss();
        this.links = resp['response'];
        this.storageProvider.setCache('streaming-list', this.links);
        this.activeFirstLink(this.links);
      },
      err =>{ loading.dismiss(); })
    }      
  }

  activeFirstLink(links){
    for (var i = 0; i < links.length; i++) {
      if (i == 0) {
        this.activeStreaming(links[i].youtube_id);
        break;
      }
    }
  }


 	activeStreaming(url){
    this.activeUrl = url;
    url = "https://www.youtube.com/embed/"+url;
    this.trustUrl = this.trustSrc(url);
 	}

 	trustSrc(url){
    return this.commonProvider.trustSrc(url);
  }
}
