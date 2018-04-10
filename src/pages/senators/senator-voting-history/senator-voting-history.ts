import { Component } from '@angular/core';
import { Platform, IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-senator-voting-history',
  templateUrl: 'senator-voting-history.html',
})
export class SenatorVotingHistoryPage {

	senator: any = {}; 
	projects: any = []
  constructor( platform: Platform,
  						 public navCtrl: NavController, 
  						 public params: NavParams) {

  	platform.ready().then(() => {
      platform.registerBackButtonAction(() => {
        this.back();
      });
    });

    this.senator = this.params.get('senator');
    this.projects = this.senator.history['votes'];
  }

  back(){
  	this.navCtrl.setRoot('SenatorProfilePage', { senator: this.senator }, { animate: true, direction: 'back' });
  }
}
