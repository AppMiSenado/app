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
import { AlertController } from 'ionic-angular';
var PopupProvider = /** @class */ (function () {
    function PopupProvider(alertCtrl) {
        this.alertCtrl = alertCtrl;
    }
    PopupProvider.prototype.error = function (message) {
        var alert = this.alertCtrl.create({
            title: 'Error',
            message: message,
            buttons: ['OK']
        });
        alert.present();
        return alert;
    };
    ;
    PopupProvider.prototype.warning = function (message) {
        var alert = this.alertCtrl.create({
            title: 'Cuidato',
            message: message,
            buttons: ['OK']
        });
        alert.present();
        return alert;
    };
    ;
    PopupProvider.prototype.success = function (message) {
        var alert = this.alertCtrl.create({
            title: 'Listo!',
            message: message,
            buttons: ['OK']
        });
        alert.present();
        return alert;
    };
    ;
    PopupProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [AlertController])
    ], PopupProvider);
    return PopupProvider;
}());
export { PopupProvider };
//# sourceMappingURL=popup.js.map