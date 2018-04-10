import { Component } from '@angular/core';
import { Platform, IonicPage, NavController, NavParams } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';

import { CommonProvider } from '../../../providers/common/common';
import { EndpointProvider } from '../../../providers/endpoint/endpoint';

@IonicPage()
@Component({
  selector: 'page-share-vote',
  templateUrl: 'share-vote.html',
})
export class ShareVotePage {

	bill: any = {};
  voteId: any = null;
  myVote: any;
  form: any = {};

  constructor( platform: Platform,
               public navCtrl: NavController, 
  	  				 private params: NavParams,
  	  				 private socialSharing: SocialSharing,
               private endpointProvider: EndpointProvider,
  	  				 private commonProvider: CommonProvider) {

  	this.bill = this.params.get('bill');
  	this.myVote = this.params.get('myVote');

    platform.ready().then(() => {
      platform.registerBackButtonAction(() => {
        this.back();
      });
    });
  }
  
  back(){
    this.navCtrl.setRoot('BillsListPage', {}, { animate: true, direction: 'forward' });
  }

  ionViewDidLoad() {
    this.saveVote();
  }

  saveVote(){
    let data = { 
      id: this.bill.id, 
      vote: this.myVote
    };

    this.endpointProvider.post('plenaries/votes', data).subscribe((resp)=>{
      this.voteId = resp['response'].id;
    }, err => {
      console.log(err);
      this.commonProvider.toast('La sesión de plenaria se encuentra cerrada, no se puede votar sobre los proyectos discutidos');
      this.navCtrl.setRoot('HomePage', {}, { animate: true, direction: 'back' });
    });
  }

  doSend(){
    this.endpointProvider.put('plenaries/comments/'+this.voteId, { comment: this.form.message }).subscribe((resp)=>{
      this.form.message = "";
      this.commonProvider.toast('Hemos enviado su mensaje');
    });
  }

  goResults(){
  	this.navCtrl.setRoot('ResultsPage', { bill: this.bill }, { animate: true, direction: 'forward' });
  }

  share(){
    let vote = this.myVote ? 'SI' : 'NO';
  	let message = 'Yo he votado '+ vote +' por el '+ this.bill.name +' en la aplicación del Senado de Colombia http://www.senado.gov.co';
    let subject = 'Votación Mi Senado Colombia'
  	this.socialSharing.share(message, subject, null, 'http://www.senado.gov.co')
  }

}