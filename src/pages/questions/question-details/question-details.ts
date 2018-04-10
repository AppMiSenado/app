import { Component, ViewChild } from '@angular/core';
import { Platform, IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommonProvider } from '../../../providers/common/common';
import { EndpointProvider } from '../../../providers/endpoint/endpoint';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@IonicPage()
@Component({
  selector: 'page-question-details',
  templateUrl: 'question-details.html',
})
export class QuestionDetailsPage {

	@ViewChild('doughnutCanvasYes') doughnutCanvasYes;
	@ViewChild('doughnutCanvasNo') doughnutCanvasNo;

  myVote: any = null;
  question: any = {}
  percentage: any = {}

  doughnutChartYes: any;
  doughnutChartNo: any;

  constructor( platform: Platform,
  						 public navCtrl: NavController, 
  						 public navParams: NavParams,
               private commonProvider: CommonProvider,
               private endpointProvider: EndpointProvider,
               private iab: InAppBrowser) {

  	platform.ready().then(() => {
      platform.registerBackButtonAction(() => {
        this.back();
      });
    });

    this.question = this.navParams.get('question');
    console.log(this.question)
  }

  back(){
    this.navCtrl.setRoot('QuestionsListPage', {}, { animate: true, direction: 'back' });
  }

  ionViewDidLoad() {
    if (this.question.vote != null) {
      let total = this.question.votes_true_count + this.question.votes_false_count;
      this.percentage.true = this.getProm(total, this.question.votes_true_count);
      this.percentage.false = this.getProm(total, this.question.votes_false_count);
      this.doughnutChartYes = this.commonProvider.generateDoughnutChart(this.doughnutCanvasYes, this.percentage.true, 'rgba(61, 174, 85, 1)');
      this.doughnutChartNo = this.commonProvider.generateDoughnutChart(this.doughnutCanvasNo, this.percentage.false, 'rgba(248, 29, 0, 1)');
    } 
  }

  getProm(total, value){
    return Math.round((value*100)/total);
  }

  goToLink(url){
  	this.iab.create(url, "_blank");
  }

  doSend(){
    let data = {
      survey_id: this.question.id,
      vote: this.myVote
    }

    this.endpointProvider.post('vote_surveys', data).subscribe(() => {
      this.commonProvider.toast('Hemos enviado su respuesta');
      this.navCtrl.setRoot('QuestionsListPage', {}, { animate: true, direction: 'back' });
    }, err => {
      this.commonProvider.toast('Ha ocurrido un error. Por favor inténtelo más tarde');
    })
  }

}
