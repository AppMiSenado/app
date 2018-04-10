import { Component, ViewChild } from '@angular/core';
import { Platform, IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { CommonProvider } from '../../../providers/common/common'; 
import { VotersComponent } from '../../../components/voters/voters';
import { AngularFireDatabase } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-results',
  templateUrl: 'results.html',
})
export class ResultsPage {

	@ViewChild('doughnutCanvasYesSenate') doughnutCanvasYesSenate;
	@ViewChild('doughnutCanvasNoSenate') doughnutCanvasNoSenate;

	@ViewChild('doughnutCanvasYesCommunity') doughnutCanvasYesCommunity;
	@ViewChild('doughnutCanvasNoCommunity') doughnutCanvasNoCommunity;

  plenary: any;
	currentItem: string = "comunidad";
	bill: any = {};
  votesCitizens: any = [];
  votesSenators: any = [];

	doughnutChartYesSenate: any;
	doughnutChartNoSenate: any;
	doughnutChartYesCommunity: any;
	doughnutChartNoCommunity: any;

  constructor( private platform: Platform,
               public navCtrl: NavController, 
  						 public params: NavParams,
  						 private commonProvider: CommonProvider,
  						 private modalCtrl: ModalController,
               private afDB: AngularFireDatabase) {

  	this.bill = this.params.get('bill');
    this.backButton();
  }

  backButton(){
    this.platform.ready().then(() => {
      this.platform.registerBackButtonAction(() => {
        this.back();
      });
    });
  }

  ionViewDidLoad() {
    this.getPlenary();
  }

  ionViewDidLeave(){
    if (this.plenary) {
      this.plenary.unsubscribe();
    }  
  }

  getPlenary(){
   let billId = this.bill.$key;
   this.plenary = this.afDB.object('plenary/projects/'+billId).snapshotChanges()
    .subscribe(() =>{
       this.afDB.object('plenary/projects/'+billId).valueChanges()
      .subscribe(resp => {
        if (resp['votes']['citizens']) {
          this.citizensResults(resp['votes']['citizens']);
        }

        if (resp['votes']['senators']) {
          this.senatorsResults(resp['votes']['senators'])
        }     
      });
    });
  }

  getProm(total, value){
    return Math.round((value*100)/total);
  }

  citizensResults(votes){
    this.votesCitizens = {
      true: 0,
      false: 0
    };

    for(let vote in votes){
      if (votes[vote]) {
        this.votesCitizens.true++;
      }else{
        this.votesCitizens.false++;
      }
    } 

    let total = this.votesCitizens.true + this.votesCitizens.false;
    this.votesCitizens.true = this.getProm(total, this.votesCitizens.true);
    this.votesCitizens.false = this.getProm(total, this.votesCitizens.false);
    this.doughnutChartYesCommunity = this.commonProvider.generateDoughnutChart(this.doughnutCanvasYesCommunity, this.votesCitizens.true, 'rgba(61, 174, 85, 1)');
    this.doughnutChartNoCommunity = this.commonProvider.generateDoughnutChart(this.doughnutCanvasNoCommunity, this.votesCitizens.false, 'rgba(248, 29, 0, 1)');
  }

  senatorsResults(votes){
    this.votesSenators = {
      true: 0,
      false: 0
    };

    for(let vote in votes){
      if (votes[vote]) {
        this.votesSenators.true++;
      }else{
        this.votesSenators.false++;
      }
    }

    let total = this.votesSenators.true + this.votesSenators.false;
    this.votesSenators.true = this.getProm(total, this.votesSenators.true);
    this.votesSenators.false = this.getProm(total, this.votesSenators.false);
    this.doughnutChartYesSenate = this.commonProvider.generateDoughnutChart(this.doughnutCanvasYesSenate, this.votesSenators.true, 'rgba(61, 174, 85, 1)');
    this.doughnutChartNoSenate = this.commonProvider.generateDoughnutChart(this.doughnutCanvasNoSenate, this.votesSenators.false, 'rgba(248, 29, 0, 1)');
  }

  back(){
    this.navCtrl.setRoot('BillsListPage', {}, { animate: true, direction: 'back' });
  }

  goVoters(vote){
  	let modalVoters = this.modalCtrl.create(VotersComponent, { bill: this.bill, vote: vote });
    modalVoters.onDidDismiss(() => {
      this.backButton();
    });
  	modalVoters.present();
  }
}