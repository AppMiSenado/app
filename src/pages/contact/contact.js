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
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { EndpointProvider } from '../../providers/endpoint/endpoint';
import { CommonProvider } from '../../providers/common/common';
var ContactPage = /** @class */ (function () {
    function ContactPage(platform, navCtrl, commonProvider, endpointProvider, iab) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.commonProvider = commonProvider;
        this.endpointProvider = endpointProvider;
        this.iab = iab;
        this.form = {};
        platform.ready().then(function () {
            platform.registerBackButtonAction(function () {
                _this.navCtrl.setRoot('HomePage', {}, { animate: true, direction: 'back' });
            });
        });
    }
    ContactPage.prototype.validateEmail = function (email) {
        return this.commonProvider.validateEmail(email);
    };
    ContactPage.prototype.goToLink = function (url) {
        this.iab.create(url, "_blank");
    };
    ContactPage.prototype.doSend = function () {
        var _this = this;
        var loading = this.commonProvider.loading();
        this.endpointProvider.post('contacts', this.form).subscribe(function () {
            loading.dismiss();
            _this.commonProvider.toast('Su mensaje ha sido enviado correctamente.');
        }, function (err) {
            loading.dismiss();
            _this.commonProvider.toast('Ha ocurrido un error. Por favor vuélvalo a intentar más tarde.');
        });
    };
    ContactPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-contact',
            templateUrl: 'contact.html',
        }),
        __metadata("design:paramtypes", [Platform,
            NavController,
            CommonProvider,
            EndpointProvider,
            InAppBrowser])
    ], ContactPage);
    return ContactPage;
}());
export { ContactPage };
//# sourceMappingURL=contact.js.map