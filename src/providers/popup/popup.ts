import {Injectable} from "@angular/core";
import { AlertController } from 'ionic-angular';

@Injectable()
export class PopupProvider{
  constructor(public alertCtrl: AlertController) { }

  error(message: string) {
    let alert = this.alertCtrl.create({
      title: 'Error',
      message: message,
      buttons: ['OK']
    });

    alert.present();
    return alert;
  };

  warning(message: string) {
    let alert =  this.alertCtrl.create({
      title: 'Cuidato',
      message: message,
      buttons: ['OK']
    });

    alert.present();
    return alert;
  };

  success(message: string) {
    let alert =  this.alertCtrl.create({
      title: 'Listo!',
      message: message,
      buttons: ['OK']
    });

    alert.present();
    return alert;
  };
}