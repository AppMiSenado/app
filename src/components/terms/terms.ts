import { Component } from '@angular/core';
import { Platform, ViewController } from 'ionic-angular';


@Component({
  selector: 'terms',
  templateUrl: 'terms.html'
})
export class TermsComponent {
  
  unregisterBackButtonAction: any;

  constructor( platform: Platform,
  						 private viewCtrl: ViewController) {

		platform.ready().then(() => {
      this.unregisterBackButtonAction = platform.registerBackButtonAction(() => {
        this.dismiss();
      });
    });
  }

  ionViewWillLeave() {
    this.unregisterBackButtonAction && this.unregisterBackButtonAction();
  }

  dismiss(){
  	this.viewCtrl.dismiss();
  }
}
