import { Component, ViewChild } from '@angular/core';
import { Platform, Content, ViewController } from 'ionic-angular'

import { CommonProvider } from '../../providers/common/common'
import { EndpointProvider } from '../../providers/endpoint/endpoint'

@Component({
  selector: 'signup-data',
  templateUrl: 'signup-data.html',
})
export class SignupDataComponent {

  @ViewChild(Content) content: Content;

  search: any = "";
  data: any = {};
  items: any = [];
  currentItem: number;
  selectAllState: any = {};

  constructor( platform: Platform,
							 private viewCtrl: ViewController,
               private commonProvider: CommonProvider,
               private endpointProvider: EndpointProvider ) {

  	platform.ready().then(() => {
      platform.registerBackButtonAction(() => {
        this.dismiss(false);
      });
    });
  }

  ionViewDidLoad(){
    this.getFilters();
  }

  dismiss(data){
  	this.viewCtrl.dismiss({ data: data });
  }

  getFilters(){
    let loading = this.commonProvider.loading();

    this.endpointProvider.get('citizens/filters')
    .subscribe(data => {
      loading.dismiss();
      this.items = data['response'];
      this.currentItem = 0;
    }, err => {
      loading.dismiss();
    })
  }

  onCancel(){
    this.search = "";
  }

  resizeContent(option){
    this.search = "";
    this.currentItem = option;
    this.content.resize();
    this.content.scrollToTop();
  }

  selectAll(category, items, isUnique){
    if (!this.selectAllState[category]) {
      this.data[category] = [];
      items.forEach(item => {
        this.data[category].push(item.id);
      });
    }else{
      this.data[category] = [];
    }
 
    this.selectAllState[category] = !this.selectAllState[category];
  }

  validateOptionFilter(category, optionId, isUnique){
    if (this.data.hasOwnProperty(category)) {
      if (!isUnique) {
        return this.data[category].indexOf(optionId) > -1;
      }else if (isUnique && optionId == this.data[category]){
        return true;
      }
      return false 
    }
    return false;
  }

  toggleOptionFilter(category, optionId, isUnique){
    if (isUnique) {
      this.data[category] = optionId;
    }else{
      if (!this.data.hasOwnProperty(category)) {
        this.data[category] = [];
        this.data[category].push(optionId);
      }else{
        if (this.validateOptionFilter(category, optionId, isUnique)) {
          let index = this.data[category].indexOf(optionId);
          this.data[category].splice(index, 1);
        }else{
          this.data[category].push(optionId);
        }
      }
    }
  }

  returnData(){
   this.dismiss(this.data);
  }
}
