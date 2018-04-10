import { Injector, Injectable } from "@angular/core";
import { App } from 'ionic-angular';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpErrorResponse } from "@angular/common/http";
import { HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Http, RequestOptions } from "@angular/http";
import { AuthProvider } from "../auth/auth";
import { GlobalProvider } from "../global/global";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class TokenInterceptorProvider implements HttpInterceptor {

	globalProvider = this.inj.get(GlobalProvider);
	authProvider = this.inj.get(AuthProvider);
	app = this.inj.get(App);

	constructor(
	    				 private http: Http,
	    				 private options: RequestOptions,
	    				 private inj: Injector) {
	}

	private applyCredentials = function (req, token) {
		let options = req.headers.set('Content-Type', 'application/json')
    												 .set('AppKey', this.globalProvider.APP_KEY)
    												 .set('Authorization', 'Bearer ' + token);

		if (!this.authProvider.isLogin()) {
			options.headers.delete('Authorization');
		}

    return req.clone({
      headers: options
    });
	};

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
			
		let currentToken = null;
		if (this.authProvider.isLogin()) {
			currentToken = this.authProvider.currentSession().access_token;
		}

    let clonedRequest = this.applyCredentials(req, currentToken);
    return next.handle(clonedRequest).do((event: HttpEvent<any>) => {
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {

        	this.options.headers.set('Authorization', 'Bearer ' + currentToken);
        	this.options.headers.set('Content-Type', 'application/json');
        	this.options.headers.set('AppKey', this.globalProvider.APP_KEY);

					return this.http.get( this.globalProvider.getApiUrl('token'), this.options ).map(res => res.json()).subscribe(data => {
						this.authProvider.updateTokenUser(data.access_token);
						return true;
			    }, err => {
			    	this.app.getRootNavs()[0].setRoot(this.globalProvider.ON_UNAUTHORIZED_GO_TO);
			    	return false;
			    })
        }
      }
    });
	}
}