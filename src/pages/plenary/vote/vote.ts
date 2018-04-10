import { Component } from '@angular/core';
import { Platform, IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-vote',
  templateUrl: 'vote.html',
})
export class VotePage {

	bill: any = {};
  myVote: any;

  constructor( platform: Platform,
               public navCtrl: NavController, 
  	  				 private params: NavParams) {

  	this.bill = this.params.get('bill');

    platform.ready().then(() => {
      platform.registerBackButtonAction(() => {
        this.back();
      });
    });
  }

  back(){
    this.navCtrl.setRoot('BillsListPage', {}, { animate: true, direction: 'back' });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VotePage');
  }

  doSend(){
  	this.navCtrl.setRoot('ShareVotePage', { bill: this.bill, myVote: this.myVote}, { animate: true, direction: 'forward' });
  }

}
