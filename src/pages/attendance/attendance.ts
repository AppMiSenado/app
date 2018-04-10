import { Component } from '@angular/core';
import { Platform, IonicPage, NavController, ModalController } from 'ionic-angular';
import { EndpointProvider } from '../../providers/endpoint/endpoint';
import { StorageProvider } from '../../providers/storage/storage';
import { CommonProvider } from '../../providers/common/common';

import { AttendanceConventionsComponent } from '../../components/attendance-conventions/attendance-conventions';

import { AngularFireDatabase } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-attendance',
  templateUrl: 'attendance.html',
})
export class AttendancePage {

	search: string = "";
	plenary: any = null;
  allSenators: any = [];
	senators: any = [];
  seats: any = []
	shadowImage: string = "";
  present: number = 0;
  missing: number = 0;

  constructor( private platform: Platform,
  						 private navCtrl: NavController,
               private modalCtrl: ModalController,
  						 private commonProvider: CommonProvider,
               private storageProvider: StorageProvider,
  						 private endpointProvider: EndpointProvider,
  						 private afDB: AngularFireDatabase) {

  	this.backButton();
  	this.getSeats();
  }

  backButton(){
    this.platform.ready().then(() => {
      this.platform.registerBackButtonAction(() => {
        this.back();
      });
    });
  }

  back(){
  	this.navCtrl.setRoot('HomePage', {}, { animate: true, direction: 'back' });
  }

	onCancel(){
		this.search = "";
	}

  ionViewDidLeave(){
    if (this.plenary) {
      this.plenary.unsubscribe();
    }
  }

	getSeats(){
    let cache = this.storageProvider.getCache('seats-list');
    if (cache) {
      this.setValues(cache);
      this.getAttendance();
    }else{
      let loading = this.commonProvider.loading();
      this.endpointProvider.get('seats')
        .subscribe(resp =>{
          loading.dismiss();
          this.setValues(resp['response']);
          this.storageProvider.setCache('seats-list', resp['response']);
          this.getAttendance();
        },
        err =>{ loading.dismiss(); })
    }
	}

	setValues(response){
		this.allSenators = this.orderArray(response);
    this.senators = this.allSenators;
    this.seats = this.allSenators;
	}

	getAttendance(){
   this.plenary = this.afDB.object('plenary').snapshotChanges()
    .subscribe(() =>{
       this.afDB.object('plenary').valueChanges()
      .subscribe(resp => {
        if (resp && !resp['istest']) {
        	this.shadowImage =  '';
          this.present = 0;
          this.missing = 0;
        	for(let assistence in resp['assistances']){
        		for(let i = 0; i < this.allSenators.length; i++){
        			if (assistence == this.allSenators[i].firebase_id) {
                console.log(resp['assistances'][assistence]);
                if (resp['assistances'][assistence]) {
                  this.present += 1;
                  this.allSenators[i].seat['fill'] = '#3dae55';
                }else{
                  this.missing += 1;
                  this.allSenators[i].seat['fill'] = '#f81d00';
                } 
        			}
        		}
        	}
        	this.setValues(this.allSenators);
        }
      });
    });
	}

	goToArea(area){
    this.shadowImage =  'assets/images/00_'+area+'.png';
    this.senators = this.orderArray( this.allSenators.filter(function(item){
                      return item.seat.sector_id == area
                    }));
  }

  orderArray(array){
    return array.sort(function(a,b) {return (a.fullname > b.fullname) ? 1 : ((b.fullname > a.fullname) ? -1 : 0);} );
  }

	showSenator(item){
		this.navCtrl.setRoot("SenatorProfilePage", { from: 'SeatsPage', senator: item }, {animate:true, direction: 'forward'});
	}

  showConventions(){
    let conventionsModal = this.modalCtrl.create(AttendanceConventionsComponent);
    conventionsModal.onDidDismiss(()=>{
      this.backButton();
    })
    conventionsModal.present();
  }
}
