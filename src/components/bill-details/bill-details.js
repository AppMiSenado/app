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
import { App, Platform, ViewController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
var BillDetailsComponent = /** @class */ (function () {
    function BillDetailsComponent(platform, viewCtrl, app, params, authProvider) {
        var _this = this;
        this.viewCtrl = viewCtrl;
        this.app = app;
        this.params = params;
        this.authProvider = authProvider;
        this.userType = {};
        this.bill = {};
        this.bill = this.params.get('bill');
        console.log(this.bill);
        platform.ready().then(function () {
            platform.registerBackButtonAction(function () {
                _this.dismiss();
            });
        });
        this.userType = this.authProvider.currentSession().type;
    }
    BillDetailsComponent.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    BillDetailsComponent.prototype.goVote = function () {
        this.dismiss();
        this.app.getRootNavs()[0].setRoot('VotePage', { bill: this.bill }, { animate: true, direction: 'forward' });
    };
    BillDetailsComponent.prototype.goResults = function () {
        this.dismiss();
        this.app.getRootNavs()[0].setRoot('ResultsPage', { bill: this.bill }, { animate: true, direction: 'forward' });
    };
    BillDetailsComponent = __decorate([
        Component({
            selector: 'bill-details',
            templateUrl: 'bill-details.html'
        }),
        __metadata("design:paramtypes", [Platform,
            ViewController,
            App,
            NavParams,
            AuthProvider])
    ], BillDetailsComponent);
    return BillDetailsComponent;
}());
export { BillDetailsComponent };
//# sourceMappingURL=bill-details.js.map