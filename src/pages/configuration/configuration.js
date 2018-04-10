var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { Platform, IonicPage, NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { StorageProvider } from '../../providers/storage/storage';
import { EndpointProvider } from '../../providers/endpoint/endpoint';
var ConfigurationPage = /** @class */ (function () {
    function ConfigurationPage(platform, authProvider, storageProvider, endpointProvider, navCtrl) {
        var _this = this;
        this.authProvider = authProvider;
        this.storageProvider = storageProvider;
        this.endpointProvider = endpointProvider;
        this.navCtrl = navCtrl;
        this.configuration = {};
        platform.ready().then(function () {
            platform.registerBackButtonAction(function () {
                _this.navCtrl.setRoot('HomePage', {}, { animate: true, direction: 'back' });
            });
        });
        this.configuration = this.authProvider.currentSession().notifications;
    }
    ConfigurationPage.prototype.updateSettings = function () {
        var _this = this;
        var user = this.authProvider.currentSession();
        var url = 'senators';
        var data = {
            "notifications": {
                "all": this.configuration.all,
                "plenary": this.configuration.plenary
            },
        };
        if (user.type == 'citizen')
            url = 'citizens';
        this.endpointProvider.put(url, data).subscribe(function () {
            user['notifications'] = data['notifications'];
            _this.storageProvider.set('auth', user);
        });
    };
    ConfigurationPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-configuration',
            templateUrl: 'configuration.html',
        }),
        __metadata("design:paramtypes", [Platform,
            AuthProvider,
            StorageProvider,
            EndpointProvider,
            NavController])
    ], ConfigurationPage);
    return ConfigurationPage;
}());
export { ConfigurationPage };
//# sourceMappingURL=configuration.js.map