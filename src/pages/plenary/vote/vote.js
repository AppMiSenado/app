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
import { Platform, IonicPage, NavController, NavParams } from 'ionic-angular';
var VotePage = /** @class */ (function () {
    function VotePage(platform, navCtrl, params) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.params = params;
        this.bill = {};
        this.bill = this.params.get('bill');
        platform.ready().then(function () {
            platform.registerBackButtonAction(function () {
                _this.back();
            });
        });
    }
    VotePage.prototype.back = function () {
        this.navCtrl.setRoot('BillsListPage', {}, { animate: true, direction: 'back' });
    };
    VotePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad VotePage');
    };
    VotePage.prototype.doSend = function () {
        this.navCtrl.setRoot('ShareVotePage', { bill: this.bill, myVote: this.myVote }, { animate: true, direction: 'forward' });
    };
    VotePage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-vote',
            templateUrl: 'vote.html',
        }),
        __metadata("design:paramtypes", [Platform,
            NavController,
            NavParams])
    ], VotePage);
    return VotePage;
}());
export { VotePage };
//# sourceMappingURL=vote.js.map