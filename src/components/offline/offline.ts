import { Component } from '@angular/core';
import { Platform, ViewController} from 'ionic-angular';

@Component({
  selector: 'offline',
  templateUrl: 'offline.html'
})
export class OfflineComponent {

  text: string;

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
