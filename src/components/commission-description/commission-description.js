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
import { Platform, ViewController, NavParams } from 'ionic-angular';
var CommissionDescriptionComponent = /** @class */ (function () {
    function CommissionDescriptionComponent(platform, params, viewCtrl) {
        var _this = this;
        this.params = params;
        this.viewCtrl = viewCtrl;
        this.commission = {};
        platform.ready().then(function () {
            platform.registerBackButtonAction(function () {
                _this.dismiss();
            });
        });
        this.commission = this.params.get('commission');
    }
    CommissionDescriptionComponent.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    CommissionDescriptionComponent = __decorate([
        Component({
            selector: 'commission-description',
            templateUrl: 'commission-description.html'
        }),
        __metadata("design:paramtypes", [Platform,
            NavParams,
            ViewController])
    ], CommissionDescriptionComponent);
    return CommissionDescriptionComponent;
}());
export { CommissionDescriptionComponent };
//# sourceMappingURL=commission-description.js.map