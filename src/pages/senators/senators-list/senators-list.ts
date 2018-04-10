import { Component } from '@angular/core';
import { Platform, IonicPage, NavController } from 'ionic-angular';
import { CommonProvider } from '../../../providers/common/common';
import { EndpointProvider } from '../../../providers/endpoint/endpoint';
import { StorageProvider } from '../../../providers/storage/storage';
import { AuthProvider } from '../../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-senators-list',
  templateUrl: 'senators-list.html',
})
export class SenatorsListPage {

  isLogin: boolean = false;
	search: string = "";
  senators: any = [];
  senatorsFiltered: any = [];
  senatorsSelected: any = [];

  constructor( platform: Platform,
  						 private navCtrl: NavController,
  						 private commonProvider: CommonProvider,
  						 private endpointProvider: EndpointProvider,
               private authProvider: AuthProvider,
               private storageProvider: StorageProvider) {

  	platform.ready().then(() => {
      platform.registerBackButtonAction(() => {
        this.navCtrl.setRoot('HomePage', {}, { animate: true, direction: 'back' });
      });
    });

    this.isLogin = this.authProvider.isLogin();
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

  toggleOptionFilter(events, optionId){
    event.preventDefault();
    event.stopPropagation();
    
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

	showSenator(item){
		this.navCtrl.setRoot("SenatorProfilePage", { from: 'SenatorsListPage', senator: item }, {animate:true, direction: 'forward'});
	}

}
