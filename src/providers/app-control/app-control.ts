import { Injectable } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http'
import { Network } from '@ionic-native/network';

import { AppVersion } from '@ionic-native/app-version';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { GlobalProvider } from '../global/global';


@Injectable()
export class AppControlProvider {

  private _app_name: string;
  private _package_name: string;
  private _version_number: string;
  private _platform: string;
  private _alert_connection: any;

  constructor( private platform: Platform,
               private http: HttpClient,
  						 private appVersion: AppVersion,
               private iab: InAppBrowser,
  						 private alertCtrl: AlertController,
               private network: Network,
               private globalProvider: GlobalProvider) {

    this._platform = this.platform.is('ios') ? 'ios' : 'android';
  }

  validateVersion(){
    Promise.all([this.appVersion.getAppName(), this.appVersion.getPackageName(), this.appVersion.getVersionNumber()])
    .then(values => { 
      this._app_name = values[0];
      this._package_name = values[1];
      this._version_number = values[2];

      this.request();
    }, err => {
      console.log(err);
    });
  }

  request(){
    let params = "?bundle_id="+this._package_name+"&version="+this._version_number+"&platform="+this._platform;

    this.http.get( this.globalProvider.VERSION_URL+params ).subscribe(resp => {
      if (resp['response'] != null) {
        this.showAlert(resp['response']);
      }
    }, err => {
      console.log(err);
    })
  }

  showAlert(response){
    let alert = this.alertCtrl.create({
      title: 'Hay una nueva versión en la tienda de '+ this._platform,
      subTitle: 'Descargue la última versión de '+ this._app_name,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            if( response['required'] == true ){
              this.iab.create( this.appUrl(), "_blank" );
            }
          }
        }
      ]
    });
    alert.present();
  }

  appUrl(){
    if ( this._platform == 'ios' ) {
      return "http://appstore.com/"+this._app_name;
    }else{
      return "https://play.google.com/store/apps/details?id="+this._package_name;
    }
  }


  valideteConnection(){
   this.network.onDisconnect().subscribe(() => {
      this.alertNotConnection();
    });

    if (this.network.type == 'none') {
      this.alertNotConnection();
    }
  }
 
  alertNotConnection(){
    if (this._alert_connection != null) {
      this._alert_connection.dismiss();
    }

    this._alert_connection = this.alertCtrl.create({
      title: 'Por favor habilite su conexión a internet',
      buttons: ['Ok']
    });

    this._alert_connection.present();
  }

}


