var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injector, Injectable } from "@angular/core";
import { App } from 'ionic-angular';
import { HttpErrorResponse } from "@angular/common/http";
import { Http, RequestOptions } from "@angular/http";
import { AuthProvider } from "../auth/auth";
import { GlobalProvider } from "../global/global";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/mergeMap';
var TokenInterceptorProvider = /** @class */ (function () {
    function TokenInterceptorProvider(http, options, inj) {
        this.http = http;
        this.options = options;
        this.inj = inj;
        this.globalProvider = this.inj.get(GlobalProvider);
        this.authProvider = this.inj.get(AuthProvider);
        this.app = this.inj.get(App);
        this.applyCredentials = function (req, token) {
            var options = req.headers.set('Content-Type', 'application/json')
                .set('AppKey', this.globalProvider.APP_KEY)
                .set('Authorization', 'Bearer ' + token);
            if (!this.authProvider.isLogin()) {
                options.headers.delete('Authorization');
            }
            return req.clone({
                headers: options
            });
        };
    }
    TokenInterceptorProvider.prototype.intercept = function (req, next) {
        var _this = this;
        var currentToken = null;
        if (this.authProvider.isLogin()) {
            currentToken = this.authProvider.currentSession().access_token;
        }
        var clonedRequest = this.applyCredentials(req, currentToken);
        return next.handle(clonedRequest).do(function (event) {
        }, function (err) {
            if (err instanceof HttpErrorResponse) {
                if (err.status === 401) {
                    _this.options.headers.set('Authorization', 'Bearer ' + currentToken);
                    _this.options.headers.set('Content-Type', 'application/json');
                    _this.options.headers.set('AppKey', _this.globalProvider.APP_KEY);
                    return _this.http.get(_this.globalProvider.getApiUrl('token'), _this.options).map(function (res) { return res.json(); }).subscribe(function (data) {
                        _this.authProvider.updateTokenUser(data.access_token);
                        return true;
                    }, function (err) {
                        _this.app.getRootNavs()[0].setRoot(_this.globalProvider.ON_UNAUTHORIZED_GO_TO);
                        return false;
                    });
                }
            }
        });
    };
    TokenInterceptorProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http,
            RequestOptions,
            Injector])
    ], TokenInterceptorProvider);
    return TokenInterceptorProvider;
}());
export { TokenInterceptorProvider };
//# sourceMappingURL=token-interceptor.js.map