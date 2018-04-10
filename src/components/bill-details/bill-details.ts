import { Component } from '@angular/core';
import { App, Platform, ViewController, NavParams } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';

@Component({
  selector: 'bill-details',
  templateUrl: 'bill-details.html'
})
export class BillDetailsComponent {

  userType: any = {};
  bill: any = {};

  constructor( platform: Platform,
  						 private viewCtrl: ViewController,
               private app: App,
               private params: NavParams,
               private authProvider: AuthProvider) {

    this.bill = this.params.get('bill');
    
    console.log(this.bill);
    platform.ready().then(() => {
      platform.registerBackButtonAction(() => {
        this.dismiss();
      });
    });

    this.userType = this.authProvider.currentSession().type;
  }

  dismiss(){
  	this.viewCtrl.dismiss();
  }

  goVote(){
    this.dismiss();
    this.app.getRootNavs()[0].setRoot('VotePage', { bill: this.bill }, { animate: true, direction: 'forward' });
  }

  goResults(){
    this.dismiss();
    this.app.getRootNavs()[0].setRoot('ResultsPage', { bill: this.bill }, { animate: true, direction: 'forward' });
  }

}
