var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from "@angular/core";
import { StorageProvider } from "../storage/storage";
import { JwtHelper } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/concat';
var AuthProvider = /** @class */ (function () {
    function AuthProvider(storageProvider) {
        this.storageProvider = storageProvider;
        this.jwtHelper = new JwtHelper();
    }
    ;
    AuthProvider.prototype.validateToken = function (errors) {
        return errors.mergeMap(function (error) {
            if (error.status === 401) {
                return Observable.of(error).delay(1000).take(3).concat(Observable.throw(error));
            }
            else {
                return Observable.throw(error);
            }
        });
    };
    AuthProvider.prototype.isLogin = function () {
        if (this.storageProvider.get('auth') == null || this.storageProvider.get('auth') == undefined) {
            return false;
        }
        else {
            return true;
        }
    };
    ;
    AuthProvider.prototype.closeSession = function () {
        this.storageProvider.destroy('auth');
    };
    ;
    AuthProvider.prototype.currentSession = function () {
        return this.storageProvider.get('auth');
    };
    ;
    AuthProvider.prototype.updateDataUser = function (data) {
        var userData = {
            "email": data.citizen.email,
            "access_token": data.token,
            "firebase_id": data.firebase_id,
            "type": data.type,
            "notifications": data.notifications
        };
        this.storageProvider.set('auth', userData);
    };
    ;
    AuthProvider.prototype.updateTokenUser = function (token) {
        var user = this.storageProvider.get('auth');
        user.access_token = token;
        this.storageProvider.set('auth', user);
    };
    AuthProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [StorageProvider])
    ], AuthProvider);
    return AuthProvider;
}());
export { AuthProvider };
//# sourceMappingURL=auth.js.map