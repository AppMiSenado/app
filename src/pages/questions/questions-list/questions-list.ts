import { Component } from '@angular/core';
import { Platform, IonicPage, NavController, NavParams } from 'ionic-angular';

import { EndpointProvider } from '../../../providers/endpoint/endpoint';
import { CommonProvider } from '../../../providers/common/common';

@IonicPage()
@Component({
  selector: 'page-questions-list',
  templateUrl: 'questions-list.html',
})
export class QuestionsListPage {

	questions: any = [];

  constructor( platform: Platform,
  						 public navCtrl: NavController, 
  						 public navParams: NavParams,
               private endpointProvider: EndpointProvider,
               private commonProvider: CommonProvider) {

  	platform.ready().then(() => {
      platform.registerBackButtonAction(() => {
        this.back();
      });
    });

    this.getData();
  }

  back(){
    this.navCtrl.setRoot('HomePage', {}, { animate: true, direction: 'back' });
  }

  getData(){
    let loading = this.commonProvider.loading();
    this.endpointProvider.get('surveys').subscribe(resp => {
      loading.dismiss();
      this.questions = resp['response'];
      console.log(resp['response']);
    }, err => {
      loading.dismiss();
    })
  }

  showQuestion(item){
    this.navCtrl.setRoot("QuestionDetailsPage", { question: item }, { animate: true, direction: 'forward' });
  }
}
