import { Component } from '@angular/core';
import { Platform, IonicPage, NavController } from 'ionic-angular';

import { CommonProvider } from '../../../providers/common/common';
import { StorageProvider } from '../../../providers/storage/storage';
import { EndpointProvider } from '../../../providers/endpoint/endpoint';

@IonicPage()
@Component({
  selector: 'page-change-senators',
  templateUrl: 'change-senators.html',
})
export class ChangeSenatorsPage {

	search: string = "";
	senators: any = [];
  senatorsFiltered: any = [];
	senatorsSelected: any = [];

  constructor( platform: Platform,
  						 private navCtrl: NavController,
               private commonProvider: CommonProvider,
               private storageProvider: StorageProvider,
               private endpointProvider: EndpointProvider) {

  	platform.ready().then(() => {
      platform.registerBackButtonAction(() => {
        this.goHome();
      });
    });

    this.getData();
  }

  goHome(){
    this.navCtrl.setRoot('HomePage', {}, { animate: true, direction: 'back' });
  }

  getData(){
    let loading = this.commonProvider.loading();
    this.endpointProvider.get('citizens/senators?favorite=0')
    .subscribe(resp =>{
      loading.dismiss();
      this.senators = resp['response'];
      this.senatorsFiltered = this.senators;

      for(let i = 0; i < this.senators.length; i++){
        if (this.senators[i].favorite) {
          this.senatorsSelected.push(this.senators[i].id);
        }
      }
    },
    err =>{
      loading.dismiss();
    })
  }

	onCancel(){
		this.search = "";
	}

	validateOptionFilter(optionId){
    return this.senatorsSelected.indexOf(optionId) > -1;
  }

  toggleOptionFilter(optionId){
    this.storageProvider.destroy('my-senators-list');

    if (this.validateOptionFilter(optionId)) {
      let index = this.senatorsSelected.indexOf(optionId);
      this.senatorsSelected.splice(index, 1);
    }else{
      this.senatorsSelected.push(optionId);
    }
 
    this.endpointProvider.put('citizens/senators/'+optionId, {}).subscribe();
  }

  doSearch(term){
    let keys = 'fullname';
    this.senatorsFiltered = this.commonProvider.search(this.senators, keys, term);
  }
}
