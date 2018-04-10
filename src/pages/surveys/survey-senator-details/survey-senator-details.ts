import { Component, ViewChild } from '@angular/core';
import { Platform, IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommonProvider } from '../../../providers/common/common';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@IonicPage()
@Component({
  selector: 'page-survey-senator-details',
  templateUrl: 'survey-senator-details.html',
})
export class SurveySenatorDetailsPage {

	@ViewChild('doughnutCanvasYes') doughnutCanvasYes;
	@ViewChild('doughnutCanvasNo') doughnutCanvasNo;

  myVote: any = null;
  question: any = {}
  percentage: any = {};

  doughnutChartYes: any;
  doughnutChartNo: any;

  constructor( platform: Platform,
  						 public navCtrl: NavController, 
  						 public navParams: NavParams,
               private commonProvider: CommonProvider,
               private iab: InAppBrowser) {

  	platform.ready().then(() => {
      platform.registerBackButtonAction(() => {
        this.back();
      });
    });

    this.question = this.navParams.get('survey');
    console.log(this.question)
  }

  back(){
    this.navCtrl.setRoot('SurveyFormPage', {}, { animate: true, direction: 'back' });
  }

  ionViewDidLoad() {
    this.generateCharts();
  }

  generateCharts(){
    let total = this.question.votes_true_count + this.question.votes_false_count;
    this.percentage.true = this.getProm(total, this.question.votes_true_count);
    this.percentage.false = this.getProm(total, this.question.votes_false_count);

    this.doughnutChartYes = this.commonProvider.generateDoughnutChart(this.doughnutCanvasYes, this.percentage.true, 'rgba(61, 174, 85, 1)');
    this.doughnutChartNo = this.commonProvider.generateDoughnutChart(this.doughnutCanvasNo, this.percentage.false, 'rgba(248, 29, 0, 1)');
  }

  getProm(total, value){
    let result = Math.round((value*100)/total);

    return isNaN(result) ? 0 : result;
  }

  goToLink(url){
  	this.iab.create(url, "_blank");
  }

}
