import { Component } from '@angular/core';
import { Platform, ViewController, ModalController, AlertController } from 'ionic-angular';
import { TermsComponent } from '../../components/terms/terms';
import { SignupDataComponent } from '../../components/signup-data/signup-data';
import { CommonProvider } from '../../providers/common/common';
import { FirebaseProvider } from '../../providers/firebase/firebase';

@Component({
  selector: 'signup',
  templateUrl: 'signup.html'
})
export class SignupComponent {

  form: any = {};

  constructor( private platform: Platform,
  					   private viewCtrl: ViewController,
               private modalCtrl: ModalController,
               private alertCtrl: AlertController,
               private commonProvider: CommonProvider,
               private firebaseProvider: FirebaseProvider) {

  	this.backButton();

    this.form['password'] = "";
  }

  backButton(){
    this.platform.ready().then(() => {
      this.platform.registerBackButtonAction(() => {
        this.dismiss();
      });
    });
  }

  dismiss(){
  	this.viewCtrl.dismiss();
  }

  validateEmail(email){
    return this.commonProvider.validateEmail(email);
  }

  doSignup(){
    if (this.commonProvider.validateEmail(this.form.email)) {
      let modalextraData = this.modalCtrl.create(SignupDataComponent);
      modalextraData.onDidDismiss(response => {
        this.backButton();
        if (response.data) {
          this.saveData(response.data);
        }
      })
      modalextraData.present();
    }else{
      this.commonProvider.toast('El correo electrónico no parece ser valido')
    }
  }

  saveData(data){
    let alert = this.alertCtrl.create({
      title: 'Términos y Condiciones',
      message: 'Cuando se registra está aceptando los <a class="terms">Términos y Condiciones</a> de esta aplicación',
      buttons: [
        {
          text: 'No acepto',
          role: 'cancel',
          handler: () => {}
        },
        {
          text: 'Acepto',
          handler: () => {
            this.firebaseProvider.createAccount(this.form.email, this.form.password, data);
            this.dismiss();
          }
        }
      ]
    });
    alert.present();
  }

  goTerms(){
    let modalTerms = this.modalCtrl.create(TermsComponent);
    modalTerms.present();
  }
}
