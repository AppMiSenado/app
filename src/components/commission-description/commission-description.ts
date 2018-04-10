import { Component } from '@angular/core';
import { Platform, ViewController, NavParams } from 'ionic-angular';

@Component({
  selector: 'commission-description',
  templateUrl: 'commission-description.html'
})
export class CommissionDescriptionComponent {

  commission: any = {};

  constructor( platform: Platform,
               private params: NavParams,
  						 private viewCtrl: ViewController) {

    platform.ready().then(() => {
      platform.registerBackButtonAction(() => {
        this.dismiss();
      });
    });

    this.commission = this.params.get('commission');
  }

  dismiss(){
  	this.viewCtrl.dismiss();
  }

}
