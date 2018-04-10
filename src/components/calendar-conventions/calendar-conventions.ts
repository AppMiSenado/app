import { Component } from '@angular/core';
import { Platform, ViewController } from 'ionic-angular';

@Component({
  selector: 'calendar-conventions',
  templateUrl: 'calendar-conventions.html'
})
export class CalendarConventionsComponent {

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
