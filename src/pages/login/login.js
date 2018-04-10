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
import { Platform, IonicPage, NavController, NavParams, ModalController, Events } from 'ionic-angular';
import { RecoverPasswordComponent } from '../../components/recover-password/recover-password';
import { SignupComponent } from '../../components/signup/signup';
import { CommonProvider } from '../../providers/common/common';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { Facebook } from '@ionic-native/facebook';
var LoginPage = /** @class */ (function () {
    function LoginPage(platform, navCtrl, navParams, commonProvider, firebaseProvider, modalCtrl, fb, events) {
        this.platform = platform;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.commonProvider = commonProvider;
        this.firebaseProvider = firebaseProvider;
        this.modalCtrl = modalCtrl;
        this.fb = fb;
        this.events = events;
        this.form = {};
        this.backButton();
        this.fb.logout();
        this.events.publish("UPDATE_SIDE_MENU", true);
    }
    LoginPage.prototype.backButton = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.platform.registerBackButtonAction(function () {
                return false;
            });
        });
    };
    LoginPage.prototype.validateEmail = function (email) {
        return this.commonProvider.validateEmail(email);
    };
    LoginPage.prototype.doLogin = function () {
        this.firebaseProvider.login(this.form.email, this.form.password);
    };
    LoginPage.prototype.loginFacebook = function () {
        this.firebaseProvider.network('facebook');
    };
    LoginPage.prototype.loginTwitter = function () {
        this.firebaseProvider.network('twitter');
    };
    LoginPage.prototype.goRecover = function () {
        var _this = this;
        var modalRecover = this.modalCtrl.create(RecoverPasswordComponent);
        modalRecover.onDidDismiss(function () {
            _this.backButton();
        });
        modalRecover.present();
    };
    LoginPage.prototype.goSignup = function () {
        var _this = this;
        var modalSignup = this.modalCtrl.create(SignupComponent);
        modalSignup.onDidDismiss(function () {
            _this.backButton();
        });
        modalSignup.present();
    };
    LoginPage.prototype.goHome = function () {
        this.navCtrl.setRoot('HomePage', { animation: true, direction: 'forward' });
    };
    LoginPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-login',
            templateUrl: 'login.html',
        }),
        __metadata("design:paramtypes", [Platform,
            NavController,
            NavParams,
            CommonProvider,
            FirebaseProvider,
            ModalController,
            Facebook,
            Events])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.js.map