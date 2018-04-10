import { Component } from '@angular/core';
import { Platform, ViewController } from 'ionic-angular';

@Component({
  selector: 'attendance-conventions',
  templateUrl: 'attendance-conventions.html'
})
export class AttendanceConventionsComponent {

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
