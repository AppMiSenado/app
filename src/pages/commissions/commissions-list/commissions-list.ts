import { Component } from '@angular/core';
import { Platform, IonicPage, NavController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-commissions-list',
  templateUrl: 'commissions-list.html',
})
export class CommissionsListPage {

	search: string = "";
	commissions: any;
	commissionsList: any = [];

  constructor( platform: Platform,
  						 private afDB: AngularFireDatabase,
  						 private navCtrl: NavController) {

  	platform.ready().then(() => {
      platform.registerBackButtonAction(() => {
        this.navCtrl.setRoot('HomePage', {}, { animate: true, direction: 'back' });
      });
    });
  }

  ionViewDidLoad() {
    this.getCommissions();
  }

  ionViewDidLeave(){
    if (this.commissions) {
      this.commissions.unsubscribe();
    }
  }

	onCancel(){
		this.search = "";
	}

	getCommissions(){
   this.commissions = this.afDB.object('commissions').snapshotChanges()
    .subscribe(() =>{
       this.afDB.object('commissions').valueChanges()
      .subscribe(resp => {
        this.commissionsList = Object.keys(resp).map(function (key) {
          resp[key]['$key'] = key;
          return resp[key];
        });
      });
    });
  }

	showCommission(item){
    console.log(item);
		this.navCtrl.setRoot('CommissionDetailsPage', { id: item.id, firebaseId: item.$key }, { animate: true, direction: 'forward' });
	}
}
