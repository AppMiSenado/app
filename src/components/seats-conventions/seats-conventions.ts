import { Component } from '@angular/core';
import { Platform, ViewController } from 'ionic-angular';

@Component({
  selector: 'seats-conventions',
  templateUrl: 'seats-conventions.html'
})
export class SeatsConventionsComponent {

  constructor( platform: Platform,
  						 private viewCtrl: ViewController) {
  	
 		platform.ready().then(() => {
      platform.registerBackButtonAction(() => {
        this.dismiss();
      });
    });
  }

  dismiss(){
  	this.viewCtrl.dismiss();
  }

}
