var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GlobalProvider } from '../global/global';
import { AuthProvider } from '../auth/auth';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/retryWhen';
var EndpointProvider = /** @class */ (function () {
    function EndpointProvider(http, globalProvider, authProvider) {
        this.http = http;
        this.globalProvider = globalProvider;
        this.authProvider = authProvider;
    }
    EndpointProvider.prototype.getData = function (data) {
        if (data.status === 204) {
            return [];
        }
        return data;
    };
    EndpointProvider.prototype.getError = function (error) {
        if (error.json().error === 'token_expired') {
            return Observable.throw('Su sessión ha expirado');
        }
        if (error.status === 429) {
            return Observable.throw(error.statusText);
        }
        var msg = '';
        if (error.json().message) {
            if (typeof error.json().message === 'object') {
                Object.keys(error.json().message).forEach(function (key) {
                    msg += key + ' (' + error.json().message[key][0] + ')<br>';
                });
            }
            else if (typeof error.json().message === 'string') {
                msg = error.json().message;
            }
        }
        else {
            msg = JSON.stringify(error.json());
        }
        return Observable.throw(msg);
    };
    EndpointProvider.prototype.serialize = function (obj) {
        var str = [];
        for (var p in obj)
            if (obj.hasOwnProperty(p)) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
        return str.join("&");
    };
    EndpointProvider.prototype.get = function (path, data) {
        var _this = this;
        if (data === void 0) { data = null; }
        if (data !== null) {
            path = path + '?' + this.serialize(data);
        }
        return this.http.get(this.globalProvider.getApiUrl(path))
            .map(this.getData)
            .retryWhen(function (errors) { return _this.authProvider.validateToken(errors); })
            .catch(this.getError);
    };
    EndpointProvider.prototype.post = function (path, data) {
        var _this = this;
        return this.http.post(this.globalProvider.getApiUrl(path), data)
            .map(this.getData)
            .retryWhen(function (errors) { return _this.authProvider.validateToken(errors); })
            .catch(this.getError);
    };
    EndpointProvider.prototype.put = function (path, data) {
        var _this = this;
        return this.http.put(this.globalProvider.getApiUrl(path), data)
            .map(this.getData)
            .retryWhen(function (errors) { return _this.authProvider.validateToken(errors); })
            .catch(this.getError);
    };
    EndpointProvider.prototype.delete = function (path) {
        var _this = this;
        return this.http.delete(this.globalProvider.getApiUrl(path))
            .map(this.getData)
            .retryWhen(function (errors) { return _this.authProvider.validateToken(errors); })
            .catch(this.getError);
    };
    EndpointProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient,
            GlobalProvider,
            AuthProvider])
    ], EndpointProvider);
    return EndpointProvider;
}());
export { EndpointProvider };
//# sourceMappingURL=endpoint.js.map