import { Component } from '@angular/core';
import { Platform, IonicPage, NavController, NavParams } from 'ionic-angular';

import { CommonProvider } from '../../../providers/common/common';
import { EndpointProvider } from '../../../providers/endpoint/endpoint';

@IonicPage()
@Component({
  selector: 'page-survey-form',
  templateUrl: 'survey-form.html',
})
export class SurveyFormPage {

  form: any = {};
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
    this.navCtrl.setRoot("SurveySenatorDetailsPage", { survey: item }, { animate: true, direction: 'forward' });
  }

  doSend(){
    this.endpointProvider.post('polls', this.form).subscribe(resp => {
      this.commonProvider.toast('Hemos enviado su encuesta a todos sus seguidores');
      this.form = {};
      this.surveys.unshift(resp['response']);
    }, err => {
      this.commonProvider.toast('Ha ocurrido un error. Por favor inténtelo más tarde');
    })
  }
}
