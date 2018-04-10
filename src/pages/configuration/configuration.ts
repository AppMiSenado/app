import { Component } from '@angular/core';
import { Platform, IonicPage, NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { StorageProvider } from '../../providers/storage/storage';
import { EndpointProvider } from '../../providers/endpoint/endpoint';


@IonicPage()
@Component({
  selector: 'page-configuration',
  templateUrl: 'configuration.html',
})
export class ConfigurationPage {

  configuration: any = {};

  constructor( platform: Platform,
               private authProvider: AuthProvider,
               private storageProvider: StorageProvider,
               private endpointProvider: EndpointProvider,
  						 private navCtrl: NavController) {

  	platform.ready().then(() => {
      platform.registerBackButtonAction(() => {
        this.navCtrl.setRoot('HomePage', {}, { animate: true, direction: 'back' });
      });
    });

    this.configuration = this.authProvider.currentSession().notifications;
  }

  updateSettings(){
    let user = this.authProvider.currentSession();
    let url = 'senators';
    let data = {
      "notifications":{
        "all": this.configuration.all, 
        "plenary": this.configuration.plenary
      },
    }

    if (user.type == 'citizen')
      url = 'citizens';

    this.endpointProvider.put(url, data).subscribe(() => {
      user['notifications'] = data['notifications'];
      this.storageProvider.set('auth', user);
    });
  }
}