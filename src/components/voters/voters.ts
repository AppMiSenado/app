import { Component } from '@angular/core';
import { Platform, ViewController, NavParams } from 'ionic-angular';

import { EndpointProvider } from '../../providers/endpoint/endpoint';
import { CommonProvider } from '../../providers/common/common';

@Component({
  selector: 'voters',
  templateUrl: 'voters.html'
})
export class VotersComponent {
  
  senators: any = [];
  vote: boolean;

  constructor( platform: Platform,
               private params: NavParams,
  						 private viewCtrl: ViewController,
               private commonProvider: CommonProvider,
               private endpointProvider: EndpointProvider) {

		platform.ready().then(() => {
      platform.registerBackButtonAction(() => {
        this.dismiss();
      });
    });

    this.vote = this.params.get('vote');
    this.getData(this.vote);
  }

  dismiss(){
  	this.viewCtrl.dismiss();
  }

  getData(vote){
    let loading = this.commonProvider.loading();
    this.endpointProvider.get('plenaries/results/'+this.params.get('bill').$key).subscribe((resp) => {
      loading.dismiss();
      this.senators = resp['response'].filter(function(item){
                                        return item.vote == vote
                                      }, vote)
    }, err => { loading.dismiss() })
  }
}
