import { Injectable } 					 from "@angular/core";
import { StorageProvider }  from "../storage/storage";

import { JwtHelper } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/concat';

@Injectable()
export class AuthProvider{
  auth: 	 any;
  jwtHelper: JwtHelper = new JwtHelper();

  constructor( private storageProvider: StorageProvider) {

  };

  validateToken(errors: Observable<Response>): Observable<any> {
	  return errors.mergeMap(error => {
	    if (error.status === 401) {
	      return Observable.of(error).delay(1000).take(3).concat(Observable.throw(error));
	    } else {
	      return Observable.throw(error);
	    }
	  });
	}

  isLogin() {
		if (this.storageProvider.get('auth') == null || this.storageProvider.get('auth') == undefined){
			return false;
		}else{
			return true;	
		}
	};

	closeSession(){
		this.storageProvider.destroy('auth');
	};

	currentSession(){
		return this.storageProvider.get('auth');
	};

	updateDataUser(data: any){
		let userData = {
			"email": data.citizen.email,
			"access_token": data.token,
			"firebase_id": data.firebase_id,
			"type": data.type,
			"notifications": data.notifications
		};

    this.storageProvider.set('auth', userData);
	};

	updateTokenUser(token){
		let user = this.storageProvider.get('auth');
		user.access_token = token
		this.storageProvider.set('auth', user);
	}
}











