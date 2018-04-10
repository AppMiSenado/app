import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, enableProdMode, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AppVersion } from '@ionic-native/app-version';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { OneSignal } from '@ionic-native/onesignal';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Network } from '@ionic-native/network';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { SocialSharing } from '@ionic-native/social-sharing';
import { NgCalendarModule  } from 'ionic2-calendar';
import { MomentModule } from 'angular2-moment';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { Facebook } from '@ionic-native/facebook';
import { TwitterConnect } from '@ionic-native/twitter-connect';

import { IonicImageLoader } from 'ionic-image-loader';
import { AuthProvider } from '../providers/auth/auth';
import { GlobalProvider } from '../providers/global/global';
import { CommonProvider } from '../providers/common/common';
import { StorageProvider } from '../providers/storage/storage';
import { PopupProvider } from '../providers/popup/popup';
import { TokenInterceptorProvider } from '../providers/token-interceptor/token-interceptor';
import { FirebaseProvider } from '../providers/firebase/firebase';
import { EndpointProvider } from '../providers/endpoint/endpoint';

import { PipesModule } from '../pipes/pipes.module';

import { RecoverPasswordComponent } from '../components/recover-password/recover-password';
import { TermsComponent } from '../components/terms/terms';
import { CalendarConventionsComponent } from '../components/calendar-conventions/calendar-conventions';
import { SeatsConventionsComponent } from '../components/seats-conventions/seats-conventions';
import { AttendanceConventionsComponent } from '../components/attendance-conventions/attendance-conventions';
import { SignupComponent } from '../components/signup/signup';
import { SignupDataComponent } from '../components/signup-data/signup-data';
import { OfflineComponent } from '../components/offline/offline';
import { CommissionDescriptionComponent } from '../components/commission-description/commission-description';
import { BillDetailsComponent } from '../components/bill-details/bill-details';
import { VotersComponent } from '../components/voters/voters';
import { CustomNotificationComponent } from '../components/custom-notification/custom-notification';
import { AppControlProvider } from '../providers/app-control/app-control';

import { CONSTANTS } from "../providers/constants/constants";

enableProdMode()
registerLocaleData(localeEs);

@NgModule({
  declarations: [
    MyApp,
    RecoverPasswordComponent,
    TermsComponent,
    CalendarConventionsComponent,
    SeatsConventionsComponent,
    AttendanceConventionsComponent,
    SignupComponent,
    SignupDataComponent,
    OfflineComponent,
    CommissionDescriptionComponent,
    BillDetailsComponent,
    VotersComponent,
    CustomNotificationComponent
  ],
  imports: [
    HttpClientModule,
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: "",
    }),
    AngularFireModule.initializeApp(CONSTANTS.FIREBASE),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgCalendarModule,
    MomentModule,
    PipesModule,
    IonicImageLoader.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    RecoverPasswordComponent,
    TermsComponent,
    CalendarConventionsComponent,
    SeatsConventionsComponent,
    AttendanceConventionsComponent,
    SignupComponent,
    SignupDataComponent,
    OfflineComponent,
    CommissionDescriptionComponent,
    BillDetailsComponent,
    VotersComponent,
    CustomNotificationComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorProvider, multi: true },
    StatusBar,
    SplashScreen,
    OneSignal,
    Network,
    ScreenOrientation,
    SocialSharing,
    LaunchNavigator,
    Facebook,
    TwitterConnect,
    AuthProvider,
    GlobalProvider,
    CommonProvider,
    StorageProvider,
    EndpointProvider,
    PopupProvider,
    InAppBrowser,
    AppVersion,
    { provide: LOCALE_ID, useValue: 'es-ES' },
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    FirebaseProvider,
    AppControlProvider
  ]
})
export class AppModule {}
