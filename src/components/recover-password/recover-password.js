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
import { Platform, ViewController } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { CommonProvider } from '../../providers/common/common';
var RecoverPasswordComponent = /** @class */ (function () {
    function RecoverPasswordComponent(platform, viewCtrl, firebaseProvider, commonProvider) {
        var _this = this;
        this.viewCtrl = viewCtrl;
        this.firebaseProvider = firebaseProvider;
        this.commonProvider = commonProvider;
        this.form = {};
        platform.ready().then(function () {
            platform.registerBackButtonAction(function () {
                _this.dismiss();
            });
        });
    }
    RecoverPasswordComponent.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    RecoverPasswordComponent.prototype.validateEmail = function (email) {
        return this.commonProvider.validateEmail(email);
    };
    RecoverPasswordComponent.prototype.doRecover = function () {
        this.firebaseProvider.recoverPassword(this.form.email);
    };
    RecoverPasswordComponent = __decorate([
        Component({
            selector: 'recover-password',
            templateUrl: 'recover-password.html'
        }),
        __metadata("design:paramtypes", [Platform,
            ViewController,
            FirebaseProvider,
            CommonProvider])
    ], RecoverPasswordComponent);
    return RecoverPasswordComponent;
}());
export { RecoverPasswordComponent };
//# sourceMappingURL=recover-password.js.map