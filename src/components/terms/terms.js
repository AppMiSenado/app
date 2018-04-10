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
var TermsComponent = /** @class */ (function () {
    function TermsComponent(platform, viewCtrl) {
        var _this = this;
        this.viewCtrl = viewCtrl;
        platform.ready().then(function () {
            _this.unregisterBackButtonAction = platform.registerBackButtonAction(function () {
                _this.dismiss();
            });
        });
    }
    TermsComponent.prototype.ionViewWillLeave = function () {
        this.unregisterBackButtonAction && this.unregisterBackButtonAction();
    };
    TermsComponent.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    TermsComponent = __decorate([
        Component({
            selector: 'terms',
            templateUrl: 'terms.html'
        }),
        __metadata("design:paramtypes", [Platform,
            ViewController])
    ], TermsComponent);
    return TermsComponent;
}());
export { TermsComponent };
//# sourceMappingURL=terms.js.map