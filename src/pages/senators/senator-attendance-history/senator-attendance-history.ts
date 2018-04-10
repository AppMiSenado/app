import { Component } from '@angular/core';
import { Platform, IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-senator-attendance-history',
  templateUrl: 'senator-attendance-history.html',
})
export class SenatorAttendanceHistoryPage {

  senator: any = {};
	projects: any = [];

  constructor( platform: Platform,
  						 public navCtrl: NavController, 
  						 public params: NavParams) {

  	platform.ready().then(() => {
      platform.registerBackButtonAction(() => {
        this.back();
      });
    });

    this.senator = this.params.get('senator');
    this.projects = this.senator.history['assistances'];
  }

  back(){
    this.navCtrl.setRoot('SenatorProfilePage', { senator: this.senator }, { animate: true, direction: 'back' });
  }
}
