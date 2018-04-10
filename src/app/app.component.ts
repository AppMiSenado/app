import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ModalController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { OneSignal } from '@ionic-native/onesignal';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { TermsComponent } from '../components/terms/terms';
import { GlobalProvider } from '../providers/global/global';
import { AuthProvider } from '../providers/auth/auth';
import { AppControlProvider } from '../providers/app-control/app-control';
import { Facebook } from '@ionic-native/facebook';

import { CustomNotificationComponent } from '../components/custom-notification/custom-notification';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: string;
  userType: any = {};
  isLogin: boolean;

  pages: any = [];

  constructor( public platform: Platform, 
               public statusBar: StatusBar, 
               public splashScreen: SplashScreen,
               public authProvider: AuthProvider,
               private globalProvider: GlobalProvider,
               private modalCtrl: ModalController,
               private appControlProvider: AppControlProvider,
               public oneSignal: OneSignal,
               private iab: InAppBrowser,
               private fb: Facebook,
               private events: Events) {

    let self = this;
    $(document).on('click', '.social-feed-element a', function(e){
      e.preventDefault();
      e.stopPropagation();
      self.iab.create( $(this).attr('href'), '_blank' );
    })

    this.initializeApp();
    this.initUser();
    
    this.isLogin = this.authProvider.isLogin();

    if (!this.isLogin) {
      this.rootPage = "LoginPage";
    }else{
      this.rootPage = "HomePage";
    }

    this.events.subscribe("UPDATE_SIDE_MENU", (eventData) => {
        this.initUser();
        this.isLogin = this.authProvider.isLogin();
    });

    this.pages = [
      { title: 'Inicio', component: "HomePage", requireLogin: false, access: 'all' },
      { title: 'Senadores', component: "SenatorsListPage", requireLogin: false, access: 'all' },
      { title: 'Comisiones', component: "CommissionsListPage", requireLogin: false, access: 'all' },
      { title: 'Control ético disciplinario', url: "http://senado.gov.co/participacion-ciudadana/control-etico-disciplinario-senadores", requireLogin: false, access: 'all' },
      { title: 'Noticias', component: "NewsPage", requireLogin: false, access: 'all' },
      { title: 'Sala de prensa', component: "PressRoomPage", requireLogin: false, access: 'all' },
      { title: 'Proyectos de ley', component: "BillsPage", requireLogin: false, access: 'all' },
      { title: 'Favoritos', component: "FavoritesPage", requireLogin: true, access: 'citizen' },
      { title: 'Streaming', component: "StreamingHistoryPage", requireLogin: false, access: 'all' },
      { title: 'Agenda', component: "CalendarPage", requireLogin: false, access: 'all' },
      { title: 'Curules', component: "SeatsPage", requireLogin: false, access: 'all' },
      { title: 'Contacto', component: "ContactPage", requireLogin: false, access: 'all' },
      { title: 'Siguenos al instante', url: "https://twitter.com/senadogovco", requireLogin: false, access: 'all' },
      { title: 'Configuración', component: "ConfigurationPage", requireLogin: true, access: 'all' },
      { title: 'Términos y condiciones', modal: TermsComponent, requireLogin: false, access: 'all' },
      { title: 'Cambiar contraseña', component: "ChangePasswordPage", requireLogin: true, access: 'all' },
    ];
  }

  initUser(){
    let user = this.authProvider.currentSession();

    if (user) {
      this.userType = user.type;
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleLightContent(); 
      this.splashScreen.hide();

      this.oneSignal.startInit(this.globalProvider.ONESIGNAL_KEY, this.globalProvider.ONESIGNAL_APP_ID);

      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
      this.oneSignal.handleNotificationOpened().subscribe((data) =>{
        this.notificationOpenedCallback(data);
      });
      this.oneSignal.enableVibrate(true);
      this.oneSignal.enableSound(true);
      this.oneSignal.endInit();

      this.appControlProvider.validateVersion();
      this.appControlProvider.valideteConnection();
    });
  }

  notificationOpenedCallback(data){
    console.log(data);
    if (typeof data.notification.payload.launchURL == 'undefined') {
      let response = data.notification.payload.additionalData;

      switch(response.type) { 
         case 'survey': { 
            if (this.authProvider.isLogin()) {
              this.modalCtrl.create("QuestionDetailsPage", { question: response.data }).present();
            }
            break; 
         } 
         case 'poll': { 
            if (this.authProvider.isLogin()) {
              this.modalCtrl.create("SurveyDetailsPage", { survey: response.data }).present();
            }
            break; 
         } 
         case 'notification': { 
            if (this.authProvider.isLogin()) {
              this.modalCtrl.create("NotificationDetailsPage", { notification: response.data }).present();
            }
            break; 
         }

         case 'custom': { 
            this.modalCtrl.create(CustomNotificationComponent, { notification: response.data }).present();
            break; 
         }
      } 
    }
  }

  openPage(page) {
    if (page['component']) {
      this.nav.setRoot(page.component);
    }else if(page['url']){
      this.goToLink(page.url);
    }else{
      this.modalCtrl.create(page.modal).present();
    }
  }

  closeSession(){
    this.authProvider.closeSession();
    this.fb.logout();
    this.events.publish("UPDATE_SIDE_MENU", true);
    this.nav.setRoot("LoginPage", {}, {animate: true, direction: 'back'});
  }

  goToLink(url){
    this.iab.create(url, "_blank");
  }

  goLogin(){
    this.nav.setRoot("LoginPage", {}, {animate: true, direction: 'back'});
  }
}
