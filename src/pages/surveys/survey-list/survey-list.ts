import { Component } from '@angular/core';
import { Platform, IonicPage, NavController, NavParams } from 'ionic-angular';

import { CommonProvider } from '../../../providers/common/common';
import { EndpointProvider } from '../../../providers/endpoint/endpoint';

@IonicPage()
@Component({
  selector: 'page-survey-list',
  templateUrl: 'survey-list.html',
})
export class SurveyListPage {

	surveys: any = [];

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
    this.endpointProvider.get('polls').subscribe(resp =>{
      loading.dismiss();
      this.surveys = resp['response'];
    }, err =>{
      loading.dismiss();
    });
  }

  showSurvey(item){
    this.navCtrl.setRoot("SurveyDetailsPage", { survey: item }, { animate: true, direction: 'forward' });
  }
}
