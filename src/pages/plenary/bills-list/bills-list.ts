import { Component } from '@angular/core';
import { Platform, IonicPage, NavController, ModalController } from 'ionic-angular';
import { BillDetailsComponent } from '../../../components/bill-details/bill-details';
import { AuthProvider } from '../../../providers/auth/auth';

import { AngularFireDatabase } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-bills-list',
  templateUrl: 'bills-list.html',
})
export class BillsListPage {

  user: any = {};
  plenary: any;
	search: string = "";
	bills: any = [];

  constructor( private platform: Platform,
  						 private navCtrl: NavController,
  						 private modalCtrl: ModalController,
               private authProvider: AuthProvider,
               private afDB: AngularFireDatabase) {

  	this.backButton();
    this.user = this.authProvider.currentSession();
  }

  backButton(){
  	this.platform.ready().then(() => {
      this.platform.registerBackButtonAction(() => {
        this.back();
      });
    });
  }

  ionViewDidLoad() {
    this.getPlenaty();
  }

  ionViewDidLeave(){
    if (this.plenary) {
      this.plenary.unsubscribe();
    }
  }

  getPlenaty(){
    this.plenary = this.afDB.object('plenary/projects').snapshotChanges()
    .subscribe(() =>{
       this.afDB.object('plenary/projects').valueChanges()
      .subscribe(resp => {
        if (resp) {
          this.bills = Object.keys(resp).map(function (key) { 
            resp[key]['$key'] = key;
            return resp[key];
          }).sort(function(a,b) {
            return a.status > b.status ? 1 : 0;
          });
        }else{
          this.navCtrl.setRoot('HomePage', {}, { animate: true, direction: 'back' });
        }
      });
    });
  }

  back(){
  	this.navCtrl.setRoot('TakePartPage', {}, { animate: true, direction: 'back' });
  }

  showResume(bill){
    bill['existVote'] = false;
    if (bill.votes && bill.votes['citizens']) {
      for(let vote in bill.votes['citizens']){
        if (this.user.firebase_id == vote) {
          bill['existVote'] = true
        }
      }
    }
    
  	let modalResume = this.modalCtrl.create(BillDetailsComponent, { bill: bill });
  	modalResume.onDidDismiss(() => {
  		this.backButton();
  	})
  	modalResume.present();
  }
}
