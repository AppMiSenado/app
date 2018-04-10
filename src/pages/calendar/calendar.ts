import { Component } from '@angular/core';
import { Platform, IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { CommonProvider } from '../../providers/common/common';
import { EndpointProvider } from '../../providers/endpoint/endpoint';
import { CalendarConventionsComponent } from '../../components/calendar-conventions/calendar-conventions';

@IonicPage()
@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
})
export class CalendarPage {

  eventSource: any = [];
  viewTitle: string;
  currentMonth: number = 0;
  title: any;
  isToday: boolean;
  calendar = {
    mode: 'month',
    currentDate: new Date(),
    dateFormatter: {
      formatMonthViewDay: function (date: Date) {
        return date.getDate().toString();
      }
    } 
  };

  constructor( private platform: Platform,
               public navCtrl: NavController, 
  						 public navParams: NavParams,
  						 private commonProvider: CommonProvider,
               private endpointProvider: EndpointProvider,
               private modalCtrl: ModalController,
               private iab: InAppBrowser) {

    this.backButton();
  }

  backButton(){
    this.platform.ready().then(() => {
      this.platform.registerBackButtonAction(() => {
        this.navCtrl.setRoot('HomePage', {}, { animate: true, direction: 'back' });
      });
    });
  }

  getEvents(date){
    let loading = this.commonProvider.loading();
    let params = "";
    if (date) {
      params = '?date='+date;
    }

    this.endpointProvider.get('events'+params)
      .subscribe(resp =>{
        loading.dismiss();
        if (resp) {
          this.eventSource =  this.commonProvider.formatEvents(resp['response'], ['published_at','published_at']);
        }
      },
      err =>{ loading.dismiss(); })
  }

  onCurrentDateChanged(event: Date) {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    event.setHours(0, 0, 0, 0);
    this.isToday = today.getTime() === event.getTime();
    this.onChangeMonth(event);
  }

  onTimeSelected(ev) {
    this.title = ev.selectedTime;
  }

  onChangeMonth(event){
    this.title = event;
    
    let date: any = new Date(event);
    let currentMonth = (date.getMonth() + 1)
    date = date.getFullYear() + '-' + currentMonth + '-' + date.getDate();
    
    if (this.currentMonth != currentMonth) {
      this.currentMonth = currentMonth;
      this.getEvents(date);
    }
  }

  onViewTitleChanged(title) {
    this.viewTitle = title; 
  }

  showConventions(){
    let modalConventions = this.modalCtrl.create(CalendarConventionsComponent);
    modalConventions.onDidDismiss(() => {
      this.backButton();
    });
    modalConventions.present();
  }

  goToLink(url){
    this.iab.create(url, "_blank");
  }

}
