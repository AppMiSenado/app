import { Component } from '@angular/core';
import { Platform, IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommonProvider } from '../../../providers/common/common';
import { EndpointProvider } from '../../../providers/endpoint/endpoint';

@IonicPage()
@Component({
  selector: 'page-survey-details',
  templateUrl: 'survey-details.html',
})
export class SurveyDetailsPage {

  myVote: any = null;
  question: any = {}

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

    this.question = this.navParams.get('survey');
  }

  back(){
    this.navCtrl.setRoot('SurveyListPage', {}, { animate: true, direction: 'back' });
  }

  ionViewDidLoad() {
    this.openSurvey();
  }

  openSurvey(){
    let data = {
      poll_id: this.question.id
    };

    this.endpointProvider.post('open_polls', data).subscribe(() => {
    }, err => {})
  }

  doSend(){
    let data = {
      poll_id: this.question.id,
      vote: this.myVote
    }

    this.endpointProvider.post('vote_polls', data).subscribe(() => {
      this.commonProvider.toast('Hemos enviado su respuesta');
      this.navCtrl.setRoot('SurveyListPage', {}, { animate: true, direction: 'back' });
    }, err => {
      this.commonProvider.toast('Ha ocurrido un error. Por favor inténtelo más tarde');
    })
  }

}
