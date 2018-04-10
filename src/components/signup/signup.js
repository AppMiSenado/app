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
import { Platform, ViewController, ModalController, AlertController } from 'ionic-angular';
import { TermsComponent } from '../../components/terms/terms';
import { SignupDataComponent } from '../../components/signup-data/signup-data';
import { CommonProvider } from '../../providers/common/common';
import { FirebaseProvider } from '../../providers/firebase/firebase';
var SignupComponent = /** @class */ (function () {
    function SignupComponent(platform, viewCtrl, modalCtrl, alertCtrl, commonProvider, firebaseProvider) {
        this.platform = platform;
        this.viewCtrl = viewCtrl;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.commonProvider = commonProvider;
        this.firebaseProvider = firebaseProvider;
        this.form = {};
        this.backButton();
        this.form['password'] = "";
        var self = this;
        $(document).on('click', '.terms', function (e) {
            e.preventDefault();
            e.stopPropagation();
            self.goTerms();
        });
    }
    SignupComponent.prototype.backButton = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.platform.registerBackButtonAction(function () {
                _this.dismiss();
            });
        });
    };
    SignupComponent.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    SignupComponent.prototype.validateEmail = function (email) {
        return this.commonProvider.validateEmail(email);
    };
    SignupComponent.prototype.doSignup = function () {
        var _this = this;
        if (this.commonProvider.validateEmail(this.form.email)) {
            var modalextraData = this.modalCtrl.create(SignupDataComponent);
            modalextraData.onDidDismiss(function (response) {
                _this.backButton();
                if (response.data) {
                    _this.saveData(response.data);
                }
            });
            modalextraData.present();
        }
        else {
            this.commonProvider.toast('El correo electrónico no parece ser valido');
        }
    };
    SignupComponent.prototype.saveData = function (data) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Términos y Condiciones',
            message: 'Cuando se registra está aceptando los <a class="terms">Términos y Condiciones</a> de esta aplicación',
            buttons: [
                {
                    text: 'No acepto',
                    role: 'cancel',
                    handler: function () { }
                },
                {
                    text: 'Acepto',
                    handler: function () {
                        _this.firebaseProvider.createAccount(_this.form.email, _this.form.password, data);
                        _this.dismiss();
                    }
                }
            ]
        });
        alert.present();
    };
    SignupComponent.prototype.goTerms = function () {
        var modalTerms = this.modalCtrl.create(TermsComponent);
        modalTerms.present();
    };
    SignupComponent = __decorate([
        Component({
            selector: 'signup',
            templateUrl: 'signup.html'
        }),
        __metadata("design:paramtypes", [Platform,
            ViewController,
            ModalController,
            AlertController,
            CommonProvider,
            FirebaseProvider])
    ], SignupComponent);
    return SignupComponent;
}());
export { SignupComponent };
//# sourceMappingURL=signup.js.map