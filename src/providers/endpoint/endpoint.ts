import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Observable';

import { GlobalProvider } from '../global/global'; 
import { AuthProvider } from '../auth/auth'; 

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/retryWhen';

@Injectable()

export class EndpointProvider {

  constructor( private http: HttpClient,
               private globalProvider: GlobalProvider,
               private authProvider: AuthProvider) {

  }

  private getData(data: Response){
    if(data.status === 204){
      return [];
    }
    return data;
  }

  private getError(error: any){

    if(error.json().error === 'token_expired'){
      return Observable.throw('Su sessión ha expirado');
    }

    if(error.status === 429){
      return Observable.throw(error.statusText);
    }

    let msg = '';

    if( error.json().message ){
      if( typeof error.json().message === 'object' ){
        Object.keys( error.json().message ).forEach( key => {
          msg += key + ' (' + error.json().message[key][0] + ')<br>';
        });
      } else if( typeof error.json().message === 'string' ){
        msg = error.json().message;
      }
    } else {
      msg = JSON.stringify(error.json());
    }

    return Observable.throw(msg);
  }

  private serialize(obj) {
    let str = [];
    for(let p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
  }

  get(path: string, data: any = null){
    if(data !== null){
      path = path + '?' + this.serialize(data);
    }

    return this.http.get(this.globalProvider.getApiUrl(path))
      .map(this.getData)
      .retryWhen(errors => this.authProvider.validateToken(errors))
      .catch(this.getError);
  }

  post(path: string, data: object) {
    return this.http.post(this.globalProvider.getApiUrl(path), data)
      .map(this.getData)
      .retryWhen(errors => this.authProvider.validateToken(errors))
      .catch(this.getError);
  }

  put(path: string, data: object){
    return this.http.put(this.globalProvider.getApiUrl(path), data)
      .map(this.getData)
      .retryWhen(errors => this.authProvider.validateToken(errors))
      .catch(this.getError);
  }

  delete(path: string){
    return this.http.delete(this.globalProvider.getApiUrl(path))
      .map(this.getData)
      .retryWhen(errors => this.authProvider.validateToken(errors))
      .catch(this.getError);
  }
}
