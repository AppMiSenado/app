import { Component } from '@angular/core';
import { Platform, IonicPage, NavController, ModalController, AlertController, ToastController, Events } from 'ionic-angular';
import { OfflineComponent } from '../../components/offline/offline';
import { AuthProvider } from '../../providers/auth/auth';
import { StorageProvider } from '../../providers/storage/storage';
import { EndpointProvider } from '../../providers/endpoint/endpoint';

import { AngularFireDatabase } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  showsOfflineModal: any;
  isLogin: boolean;
  user: any = {};
  plenary: any;
  commissions: any;

  plenaryOnline: boolean = false;
  commissionsOnline: boolean = false;

  mySenators: any = [];

  countPolls: number = 0;
  countNotifications: number = 0;

  pages: any = [
                  { title: "Noticias", component: "NewsPage" },
                  { title: "Senadores", component: "SenatorsListPage" },
                  { title: "Agenda", component: "CalendarPage" },
                  { title: "Curules", component: "SeatsPage" },
                  { title: "Comisiones", component: "CommissionsListPage" },
                  { title: "Streaming", component: "StreamingHistoryPage" },
                  { title: "Sala de prensa", component: "PressRoomPage" }
               ]

  constructor( private platform: Platform,
  						 private navCtrl: NavController,
  						 private alertCtrl: AlertController,
  						 private modalCtrl: ModalController,
               private toastCtrl: ToastController,
               private endpointProvider: EndpointProvider,
               private authProvider: AuthProvider,
               private storageProvider: StorageProvider,
               private events: Events,
               private afDB: AngularFireDatabase) {
    
    this.backButton();
    this.isLogin = this.authProvider.isLogin();
    this.user = this.authProvider.currentSession();

    if (!this.user) {
      this.user = {
        "type": null
      }
    }
  }

  backButton(){
    this.platform.ready().then(() => {
      this.platform.registerBackButtonAction(() => {
        let closeAlert = this.alertCtrl.create({
          title: '¿Desea salir de la aplicación?',
          buttons: [
            {
              text: 'Quedarme',
              role: 'cancel',
              handler: () => {}
            },
            {
              text: 'Salir',
              handler: () => {
                this.platform.exitApp();
              }
            }
          ]
        });
        closeAlert.present();
      });
    });
  }

  ionViewDidLoad() {
    if (!this.isLogin) {
      this.events.publish("UPDATE_SIDE_MENU", true);
    }

    this.showsOfflineModal = setTimeout(() => {
      let date = new Date();
      var month = date.getUTCMonth() + 1;
      var day = date.getUTCDate();
      var year = date.getUTCFullYear();

      let cache = this.storageProvider.getCache('showsOfflineModal-'+day+month+year);
      if (!cache) {
        if (!this.plenaryOnline && !this.commissionsOnline) {
          let offlineModal = this.modalCtrl.create(OfflineComponent);
          offlineModal.onDidDismiss(() => {
            this.backButton();
          })
          offlineModal.present();
          this.storageProvider.setCache('showsOfflineModal-'+day+month+year, true);
        } 
      }
    }, 7000);
    
    this.getData();
  }

  ionViewDidLeave(){
    if (this.plenary) {
      this.plenary.unsubscribe();
    }

    if (this.commissions) {
      this.commissions.unsubscribe();
    }

    if (this.showsOfflineModal) {
      clearTimeout(this.showsOfflineModal);
    }
  }

  getData(){
    this.getMySenators();
    this.getCommissions();

    if (this.user.type == "citizen") {
      this.getCountPolls();
    }else if(this.user.type == "senator"){
      this.getCountNotifications();
    }
  }

  getCountPolls(){
    this.endpointProvider.get('count_polls')
    .subscribe(resp =>{
      this.countPolls = resp['response'];
    },
    err =>{ })
  }

  getCountNotifications(){
    this.endpointProvider.get('count_incomes')
    .subscribe(resp =>{
      this.countNotifications = resp['response'];
    },
    err =>{ })
  }

  getMySenators(){
    if (this.isLogin) {
        let cache = this.storageProvider.getCache('my-senators-list');
      if (cache && cache.length != 0) {
        this.mySenators = cache;
        this.getPlenary();
      }else{
        this.endpointProvider.get('citizens/senators?favorite=1')
        .subscribe(resp =>{
          this.mySenators = resp['response'];
          this.storageProvider.setCache('my-senators-list', this.mySenators);
          this.getPlenary();
        },
        err =>{ this.getPlenary(); })
      }
    }else{
      this.getPlenary();
    }
  }

  getPlenary(){
   this.plenary = this.afDB.object('plenary').snapshotChanges()
    .subscribe(() =>{
       this.afDB.object('plenary').valueChanges()
      .subscribe(resp => {
        if (resp && !resp['istest']) {
          this.plenaryOnline = true;
          this.storageProvider.set('currentStreaming', resp['livestreaming']);
          this.valideteAssistence(resp['assistances']);
        }else{
          this.plenaryOnline = false;
        }
      });
    });
  }

  getCommissions(){
   this.commissions = this.afDB.object('commissions').snapshotChanges()
    .subscribe(() =>{
       this.afDB.object('commissions').valueChanges()
      .subscribe(resp => {
        let commissionsOnline = 0
       
        for(let item in resp){
          if (resp[item].status) {
            commissionsOnline++;
          }
        }

        if (commissionsOnline) {
          this.commissionsOnline = true;
        }else{
          this.commissionsOnline = false;
        }
      });
    });
  }

  valideteAssistence(senators){
    for(let i = 0; i < this.mySenators.length; i++){
      for(let senator in senators){
        if (senator == this.mySenators[i].firebase_id) {
          this.mySenators[i]['attendance'] = senators[senator];
        }
      }
    }
  }

  removeSenator(index, name, id){
    name = name.split(" ");
    name = name[name.length - 2] +' '+ name[name.length - 1];
    let closeAlert = this.alertCtrl.create({
        title: '¿Desea quitar a '+ name +' de sus senadores favoritos?',
        buttons: [
          {
            text: 'No',
            role: 'cancel',
            handler: () => {}
          },
          {
            text: 'Si',
            handler: () => {
              this.endpointProvider.put('citizens/senators/'+id, {}).subscribe();
              this.mySenators.splice(index, 1);
            }
          }
        ]
      });
      closeAlert.present();
  }

  messageNoLogin(){
    let duration:number = 7000;
    let elapsedTime:number = 0;
    let intervalHandler = setInterval( () => { elapsedTime += 10; },10);
    let toast = this.toastCtrl.create({
        message: "Debe iniciar sesión para acceder a esta sección",
        duration: duration,
        showCloseButton: true,
        closeButtonText: "Ok"
    });
    
    toast.onDidDismiss(() => {
      clearInterval(intervalHandler);
      if(elapsedTime < duration) this.goLogin();
    });

    toast.present();
  }

  goLogin(){
    this.navCtrl.setRoot("LoginPage", {}, { animate: true, direction: "back" });
  }

  goSurveys(){
    if (this.isLogin) {
      this.navCtrl.setRoot('SurveyListPage', {}, { animate: true, direction: 'forward' });
    }else{
      this.messageNoLogin();
    }
  }

  showSenator(item){
    this.navCtrl.setRoot("SenatorProfilePage", { from: "HomePage", senator: item }, { animate: true, direction: "forward" });
  }

  goToPage(page){
    this.navCtrl.setRoot(page.component, {}, { animate: true, direction: "forward" });
  }

  goQuestions(){
    if (this.isLogin) {
      this.navCtrl.setRoot("QuestionsListPage", {}, { animate: true, direction: "forward" });
    }else{
      this.messageNoLogin();
    }
  }

  goNotifications(){
    this.navCtrl.setRoot("NotificationsListPage", {}, { animate: true, direction: "forward" });
  }

  goSurveysSenator(){
    if (this.isLogin) {
      this.navCtrl.setRoot("SurveyFormPage", {}, { animate: true, direction: "forward" });
    }else{
      this.messageNoLogin();
    }
  }

  goCommissions(){
    this.navCtrl.setRoot("CommissionsListPage", {}, { animate: true, direction: "forward" });
  }

  goAttendance(){
    this.navCtrl.setRoot("AttendancePage", {}, { animate: true, direction: "forward" });
  }

  goTakePart(){
    if (this.isLogin) {
      this.navCtrl.setRoot("TakePartPage", {}, { animate: true, direction: "forward" });
    }else{
      this.messageNoLogin();
    }
  }

  changeSenators(){
    if (this.isLogin) {
      this.navCtrl.setRoot("SenatorsListPage", {}, { animate: true, direction: "forward" });
    }else{
      this.messageNoLogin();
    } 
  }

}
