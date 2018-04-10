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
import { CommonProvider } from '../../providers/common/common';
import { FirebaseProvider } from '../../providers/firebase/firebase';
var ChangePasswordPage = /** @class */ (function () {
    function ChangePasswordPage(platform, navCtrl, commonProvider, iab, firebaseProvider) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.commonProvider = commonProvider;
        this.iab = iab;
        this.firebaseProvider = firebaseProvider;
        this.form = {};
        platform.ready().then(function () {
            platform.registerBackButtonAction(function () {
                _this.navCtrl.setRoot('HomePage', {}, { animate: true, direction: 'back' });
            });
        });
    }
    ChangePasswordPage.prototype.doSend = function () {
        this.firebaseProvider.changePassword(this.form.email);
    };
    ChangePasswordPage.prototype.validateEmail = function (email) {
        return this.commonProvider.validateEmail(email);
    };
    ChangePasswordPage.prototype.goToLink = function (url) {
        this.iab.create(url, "_blank");
    };
    ChangePasswordPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-change-password',
            templateUrl: 'change-password.html',
        }),
        __metadata("design:paramtypes", [Platform,
            NavController,
            CommonProvider,
            InAppBrowser,
            FirebaseProvider])
    ], ChangePasswordPage);
    return ChangePasswordPage;
}());
export { ChangePasswordPage };
//# sourceMappingURL=change-password.js.map