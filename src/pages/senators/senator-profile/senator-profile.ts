import { Component } from '@angular/core';
import { Platform, IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { StorageProvider } from '../../../providers/storage/storage';
import { EndpointProvider } from '../../../providers/endpoint/endpoint';
import { CommonProvider } from '../../../providers/common/common';

@IonicPage()
@Component({
  selector: 'page-senator-profile',
  templateUrl: 'senator-profile.html',
})
export class SenatorProfilePage {
  socialFeedInit: any = null;
  senator: any = {};
  loading: boolean;
  histories: any = [];

  constructor( platform: Platform,
               private params: NavParams,
  						 private navCtrl: NavController,
               private storageProvider: StorageProvider,
               private endpointProvider: EndpointProvider,
               private commonProvider: CommonProvider,
               private iab: InAppBrowser) {

  	platform.ready().then(() => {
      platform.registerBackButtonAction(() => {
        this.back();
      });
    });

    this.senator = this.params.get('senator');
  }
  
  back(){
    let params = {}
    let id = this.params.get('id');
    let firebaseId = this.params.get('firebaseId');
    if (id && firebaseId) {
      params['id'] = id;
      params['firebaseId'] = firebaseId;
    }

    let from = this.params.get('from');
    if (!from) {
      from = 'HomePage';
    }
    
    this.navCtrl.setRoot(from, params, { animate: true, direction: 'back' });
  }

  ngOnInit(){
    this.loading = true;
    this.getHistories();
    this.initSocialFeed();
  } 

  getHistories(){
    let cache = this.storageProvider.getCache('senator-history-'+this.senator['id']);
    if (cache && cache.length != 0) {
      this.senator['history'] = cache['history'];
    }else{
      let loading = this.commonProvider.loading();
      this.endpointProvider.get('senators/'+this.senator['id'])
      .subscribe(resp =>{
        loading.dismiss();
        this.senator['history'] = resp['response']['history'];
        this.storageProvider.setCache('senator-history-'+this.senator['id'], this.senator);
      },
      err =>{ console.log(err)});
    }
  }

  initSocialFeed(){
    let config = {
      length:20,                                   
      show_media:true,                               
      media_min_width: 300,                                                 
      template_html: `<div class='social-feed-element {{? !it.moderation_passed}}hidden{{?}}' dt-create='{{=it.dt_create}}' social-feed-id = '{{=it.id}}'>
          <div class='content'>
              <div class='media-body'>
                  <p>
                      <i class='social-network-icon icon-{{=it.social_network}}'></i>
                      <span class='muted pull-right'> {{=it.time_ago}}</span> 
                  </p>
                  <p class='social-feed-text'>{{=it.text}} <a href='{{=it.link}}' target='_blank' class='read-button'>Ver más</a></p>
              </div>
          </div>
          {{=it.attachment}}
      </div>`,
      date_format: "ll",                             
      date_locale: "es",                         
    }

    if (this.senator.contacts.socialNetworks && this.senator.contacts.socialNetworks.twitter) {
      config['twitter'] = {
        accounts: ['@'+this.senator.contacts.socialNetworks.twitter],                     
        limit: 10,                               
        consumer_key: 'XjqU16kih4IyyVrXGuktHQXOI',  
        consumer_secret: 'ExGCAkyNswfEJRCwRPEcvnSuQZ3sJwEBG6XsPdRUS2HdxZn7cL'
      }
    }

    if (this.senator.contacts.socialNetworks && this.senator.contacts.socialNetworks.facebook) {
      config['facebook'] = {
        accounts: ['@'+this.senator.contacts.socialNetworks.facebook, '!'+this.senator.contacts.socialNetworks.facebook],
        limit: 10,                               
        access_token: '198336894063403|4047a1c4995aa05e34dc63a812926684'
      }
    }

    this.socialFeedInit = $('#social-feed-container').socialfeed(config);

    setTimeout( () => {
      this.loading = false;
    }, 2000)
  }

  goToLink(url){
    this.iab.create(url, "_blank");
  }

  goVotingHistory(){
    this.navCtrl.setRoot('SenatorVotingHistoryPage', { senator: this.senator }, { animate: true, direction: 'forward' });
  }

  goAttendenceHistory(){
    this.navCtrl.setRoot('SenatorAttendanceHistoryPage', { senator: this.senator }, { animate: true, direction: 'forward' });
  }
}
