import { Component } from '@angular/core';
import { Platform, IonicPage, NavController, ModalController } from 'ionic-angular';
import { EndpointProvider } from '../../providers/endpoint/endpoint';
import { StorageProvider } from '../../providers/storage/storage';
import { CommonProvider } from '../../providers/common/common';

import { SeatsConventionsComponent } from '../../components/seats-conventions/seats-conventions';

@IonicPage()
@Component({
  selector: 'page-seats',
  templateUrl: 'seats.html',
})
export class SeatsPage {

	search: string = "";
  allSenators: any = [];
	senators: any = [];
  seats: any = []
	shadowImage: string = "";

  constructor( private platform: Platform,
  						 private navCtrl: NavController,
               private modalCtrl: ModalController,
  						 private commonProvider: CommonProvider,
               private storageProvider: StorageProvider,
  						 private endpointProvider: EndpointProvider) {

  	this.backButton();
    this.getSeats();
  }

  backButton(){
    this.platform.ready().then(() => {
      this.platform.registerBackButtonAction(() => {
        this.navCtrl.setRoot('HomePage', {}, { animate: true, direction: 'back' });
      });
    });
  }

	onCancel(){
		this.search = "";
	}

	getSeats(){
    let cache = this.storageProvider.getCache('seats-list');
    if (cache) {
      this.setData(cache);
    }else{
      let loading = this.commonProvider.loading();
      this.endpointProvider.get('seats')
        .subscribe(resp =>{
          loading.dismiss();
          let data = this.orderArray(resp['response']);
          this.setData(data);
          this.storageProvider.setCache('seats-list', this.allSenators);
        },
        err =>{ loading.dismiss(); })
    }
	}

  setData(data){
    this.allSenators = data
    this.senators = this.allSenators;
    this.seats = this.allSenators;
  }

	goToArea = function(area){
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
    let conventionsModal = this.modalCtrl.create(SeatsConventionsComponent);
    conventionsModal.onDidDismiss(()=>{
      this.backButton();
    })
    conventionsModal.present();
  }
}
