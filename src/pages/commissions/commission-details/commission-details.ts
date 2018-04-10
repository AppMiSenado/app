import { Component, ChangeDetectorRef } from '@angular/core';
import { Platform, IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { CommissionDescriptionComponent } from '../../../components/commission-description/commission-description';
import { CommonProvider } from '../../../providers/common/common';
import { StorageProvider } from '../../../providers/storage/storage';
import { AuthProvider } from '../../../providers/auth/auth';
import { EndpointProvider } from '../../../providers/endpoint/endpoint';

import { AngularFireDatabase } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-commission-details',
  templateUrl: 'commission-details.html',
})
export class CommissionDetailsPage {

  BLOCK_TIME = 180000;

  user: any;
  commissionsRealTime: any;
  isDisabledComment: boolean = false;
  setTimeIsDisabledComment: any = null;

  commission: any = {};
  comment: string = "";
  comments: any = [];

  trustUrl: any = null;
  trustUrlLive: any = null;
  activeUrl: any;
  links: any = [];
  section: string = "streaming";
  senators: any = [];

  currentMonth: number = 0;
  eventSource: any;
  viewTitle: string;
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
               private chRef: ChangeDetectorRef,
  						 private modalCtrl: ModalController,
               private iab: InAppBrowser,
               private commonProvider: CommonProvider,
               private screenOrientation: ScreenOrientation,
               private endpointProvider: EndpointProvider,
               private storageProvider: StorageProvider,
               private authProvider: AuthProvider,
               private afDB: AngularFireDatabase) {

    this.backButton();

    this.user = this.authProvider.currentSession();

    if (!this.user) {
      this.user = {
        type: null
      }
    }
  }

  backButton(){
    this.platform.ready().then(() => {
      this.platform.registerBackButtonAction(() => {
        this.back();
      });
    });
  }

  back(){
    this.navCtrl.setRoot('CommissionsListPage', {}, { animate: true, direction: 'back' });
  }

  ionViewDidLoad(){
    this.screenOrientation.unlock();
    this.getData();
  }

  ionViewWillLeave(){
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);

    if (this.commissionsRealTime) {
      this.commissionsRealTime.unsubscribe();
    }

    if (this.setTimeIsDisabledComment) {
      clearInterval(this.setTimeIsDisabledComment);  
    }
  }

  getData(){
    this.getCommision();
    this.getRealTimeCommission();
  }

  getCommision(){
    let cache = this.storageProvider.getCache('commission-details-'+this.navParams.get('id'));
    if (cache) {
      this.senators = cache['senators'];
      this.getStreaming(cache['histories']);
    }else{
      let loading = this.commonProvider.loading();
      this.endpointProvider.get('commissions/'+this.navParams.get('id'))
      .subscribe(resp =>{
        loading.dismiss();
        this.senators = resp['response']['senators'];
        this.getStreaming(resp['response']['histories']);
        this.storageProvider.setCache('commission-details-'+this.navParams.get('id'), resp['response']);
      },
      err =>{ loading.dismiss(); })
    }

    this.commentMessage();
  }

  commentMessage(){
    this.lastCommentMessage();

    this.setTimeIsDisabledComment = setInterval(()=>{
      this.lastCommentMessage();
    }, 60000)
  }

  lastCommentMessage(){
    let lastComment = this.storageProvider.get('last-comment-commission-'+this.navParams.get('id')) || 0;
    this.isDisabledComment = new Date().getTime() - lastComment < this.BLOCK_TIME ? true : false;

    console.log(this.isDisabledComment)
    return this.isDisabledComment;
  }

  getEvents(date){

    let loading = this.commonProvider.loading();
    let params = "?commission_id=" + this.navParams.get('id');
    if (date) {
      params += '&date='+date;
    }

    this.endpointProvider.get('events'+params)
      .subscribe(resp =>{
        loading.dismiss();
        if (resp) {
          this.eventSource = this.commonProvider.formatEvents(resp['response'], ['published_at','published_at']);
        }
      },
      err =>{ loading.dismiss(); })
  }

  getStreaming(history){
    this.links = history;
    for (var i = 0; i < this.links.length; i++) {
      if (i == 0) {
        this.activeStreaming(this.links[i].youtube_id);
        break;
      }
    }
  }

  activeStreaming(url){
    this.activeUrl = url;
    url = "https://www.youtube.com/embed/"+url;
    this.trustUrl = this.trustSrc(url);
  }

  getRealTimeCommission(){
   let id = this.navParams.get('firebaseId');
   this.commissionsRealTime = this.afDB.object('commissions/'+id).snapshotChanges()
    .subscribe(() =>{
       this.afDB.object('commissions/'+id).valueChanges()
      .subscribe(resp => {
        this.commission = resp;
        console.log(resp)
        if (this.trustUrlLive == null && this.commission.livestreaming) {
          console.log(this.trustUrlLive);
          this.trustUrlLive = this.trustSrc(this.commission.livestreaming);
        }

        if (this.commission.comments) {
          this.comments = Object.keys(this.commission.comments).map(key => { 
                          return this.commission.comments[key];
                        })
                        .filter(item => item['status'] == true)
                        .sort(function(a,b) {return (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0);} );
        }
        
      });
    });
  }

  showDescription(){
  	let modalDescription = this.modalCtrl.create(CommissionDescriptionComponent, { commission: this.commission });
    modalDescription.onDidDismiss(() => {
      this.backButton();
    });
  	modalDescription.present();
  }

  showSenator(item){
    this.navCtrl.setRoot("SenatorProfilePage", { from: 'CommissionDetailsPage', id: this.navParams.get('id'), firebaseId: this.navParams.get('firebaseId'), senator: item }, {animate:true, direction: 'forward'});
  }

  onCurrentDateChanged(event: Date) {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    event.setHours(0, 0, 0, 0);
    this.isToday = today.getTime() === event.getTime();
    this.onChangeMonth(event);
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

  onTimeSelected(ev) {
    this.title = ev.selectedTime;
    console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
     (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  sendComment(){
    let data = {
      message: this.comment,
      email: this.user.email,
      date: new Date().getTime(),
      citizen: this.user.firebase_id
    }
    console.log(data);
    const comments = this.afDB.list('commissions/' + this.navParams.get('firebaseId') + '/comments');
    comments.push(data);

    this.comment = "";
    this.chRef.detectChanges();
    this.storageProvider.set('last-comment-commission-'+this.navParams.get('id'), new Date().getTime());
    this.isDisabledComment = true;
    this.commonProvider.toast('Gracias, su mensaje está sujeto aprobación');
  }

  goToLink(url){
    this.iab.create(url, "_blank");
  }

  trustSrc(url){
    return this.commonProvider.trustSrc(url);
  }

}
