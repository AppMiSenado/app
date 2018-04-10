import { Injectable } from '@angular/core';
import { App, ModalController, AlertController, Events } from 'ionic-angular';

import { AuthProvider } from '../auth/auth';
import { CommonProvider } from '../common/common';
import { EndpointProvider } from '../endpoint/endpoint';

import { SignupDataComponent } from '../../components/signup-data/signup-data';

import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { TwitterConnect } from '@ionic-native/twitter-connect';

import { OneSignal } from '@ionic-native/onesignal';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

@Injectable()
export class FirebaseProvider {

	loading: any;
	fromNetwork: boolean = false;

  constructor( public endponintProvider: EndpointProvider,
  						 private app: App,
  						 private modalCtrl: ModalController,
  						 private alertCtrl: AlertController,
  						 private authProvider: AuthProvider,
  						 private commonProvider: CommonProvider,
  						 private oneSignal: OneSignal,
  						 private afAuth: AngularFireAuth,
  						 private events: Events,
  						 private fb: Facebook,
  						 private tw: TwitterConnect) {
  }

  messageError(error){
		console.log(error)
  	switch(error.code) {
	  	case 'auth/user-not-found':
	      return 'Los datos son incorrectos.'
	    case 'auth/network-request-failed':
	      return 'Ha ocurrido una falla en la conexión.'
	    case 'auth/account-exists-with-different-credential':
	    	return 'Ya existe una cuenta con el mismo correo electrónico pero con diferentes credenciales de inicio de sesión.'
	   	case 'auth/email-already-in-use':
        return 'El correo electrónico ya está registrado.'
      case 'auth/argument-error':
        return 'El correo electrónico no parece ser valido.'
      case 'auth/weak-password':
        return 'La contraseña debe ser mayor de 6 digitos.'
      default:
        return 'Algo ha ocurrido, por favor vuelva a intentarlo.'
  	}
	};

  async login(email, password){
		this.loading = this.commonProvider.loading();
		try{
			const response = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
			if (response.uid) {
				this.backendAuthentication(response.uid, email, false);
			}
		}catch(e){
			this.loading.dismiss();
			this.commonProvider.toast( this.messageError(e) );
		}
	}

	network(network){
		this.loading = this.commonProvider.loading();
  	if (network == 'facebook') {
			this.loginWithFacebook();
		}else if (network == 'twitter') {
			this.loginWithTwitter();
		}
	};

	loginWithFacebook(){
		console.log('entre Facebook')
		this.fb.login(['public_profile', 'email'])
    .then((result: FacebookLoginResponse) => {
    	console.log('response Facebook', result)
    	let credential = firebase.auth.FacebookAuthProvider.credential(result.authResponse.accessToken);
    	console.log(credential);
    	this.afAuth.auth.signInWithCredential(credential)
    	.then(success => {
    		this.fromNetwork = true;
    		this.backendAuthentication(success.uid, success.email, false);
			})
			.catch(error => {
				this.loading.dismiss(); 
        this.commonProvider.toast( this.messageError(error) );
      });
    })
    .catch(e => { 
    	this.loading.dismiss(); 
    	console.log(e) 
    });
	}

	loginWithTwitter(){
		this.tw.login()
    .then(result => {
    	let credential = firebase.auth.TwitterAuthProvider.credential(result.token, result.secret);
    	this.afAuth.auth.signInWithCredential(credential)
    	.then(success => {
    		this.fromNetwork = true;
				this.backendAuthentication(success.uid, success.email, false);
			})
			.catch(error => {
				this.loading.dismiss();
        this.commonProvider.toast( this.messageError(error) );
      });
    })
    .catch(e => { 
    	this.loading.dismiss(); 
    	console.log(e) 
    });
	}

	async createAccount(email, password, data){
		this.loading = this.commonProvider.loading();
		try{
			const response = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
			if (response.uid) {
				this.backendAuthentication(response.uid, email, data);
			}
		}catch(e){
			this.loading.dismiss();
			this.commonProvider.toast( this.messageError(e) );
		}
	}

	backendAuthentication(firebaseID, email, data){
		this.oneSignal.getIds().then(dataOneSignal => {
	  	let sendData = {}
	  	if (data) {
	  		sendData = data	
	  		sendData["notifications"] = {
	  			all: true,
	  			plenary: true
	  		}
	  	}

	  	sendData["email"] = email;
	  	sendData["firebase_id"] = firebaseID;
	    sendData["onesignal_id"] = dataOneSignal.userId;

	    if (data) {
	    	this.apiSignup(sendData);
	    }else{
	    	this.apiLogin(sendData);
	    }
	  });
	}

	apiLogin(data){
		this.endponintProvider.post('auth', data)
    .subscribe(
      res => {
        this.loading.dismiss();
        this.authProvider.updateDataUser(res['response']);
        this.events.publish("UPDATE_SIDE_MENU", true)
        this.app.getRootNavs()[0].setRoot("HomePage", {}, {animate: true, direction: 'forward'});
      },
      err => {
        this.loading.dismiss();
        console.log(err)
        if (this.fromNetwork) {
        	this.requiereSignup(data);
        }else{
        	this.commonProvider.toast("Datos incorrectos");
        }
      }
    );
	}

	requiereSignup(data){
		let modalextraData = this.modalCtrl.create(SignupDataComponent);
    modalextraData.onDidDismiss(response => {
      if (response.data) {
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
		            this.backendAuthentication(data.firebase_id, data.email, response.data);
		          }
		        }
		      ]
		    });
		    alert.present(); 
      }
    })
    modalextraData.present();
	}

	apiSignup(data){
		this.endponintProvider.post('citizens', data)
    .subscribe(
      res => {
    		this.loading.dismiss();
      	this.authProvider.updateDataUser(res['response']);
      	this.events.publish("UPDATE_SIDE_MENU", true)
      	this.app.getRootNavs()[0].setRoot("HomePage", {}, {animate: true, direction: 'forward'});
      },
      err => {
        this.loading.dismiss();
        console.log(err)
        this.commonProvider.toast("Datos incorrectos");
      }
    );
	}

	recoverPassword(email){
		this.loading = this.commonProvider.loading();
		this.afAuth.auth.sendPasswordResetEmail(email).then((success) => {
			this.loading.dismiss(); 
  		this.commonProvider.toast('Revise su correo electrónico, le hemos enviado los pasos para restablecer su contraseña')
		})
		.catch((error) => {
			this.loading.dismiss(); 
      this.commonProvider.toast( this.messageError(error) );
    });
	}

	changePassword(email){
		this.loading = this.commonProvider.loading();
		this.afAuth.auth.sendPasswordResetEmail(email).then((success) => {
			this.loading.dismiss(); 
  		this.commonProvider.toast('Revise su correo electrónico, le hemos enviado los pasos para cambiar su contraseña')
		})
		.catch((error) => {
			this.loading.dismiss(); 
      this.commonProvider.toast( this.messageError(error) );
    });
	}
}
