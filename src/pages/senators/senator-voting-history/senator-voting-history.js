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
var SenatorVotingHistoryPage = /** @class */ (function () {
    function SenatorVotingHistoryPage(platform, navCtrl, params) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.params = params;
        this.senator = {};
        this.projects = [];
        platform.ready().then(function () {
            platform.registerBackButtonAction(function () {
                _this.back();
            });
        });
        this.senator = this.params.get('senator');
        this.projects = this.senator.history['votes'];
    }
    SenatorVotingHistoryPage.prototype.back = function () {
        this.navCtrl.setRoot('SenatorProfilePage', { senator: this.senator }, { animate: true, direction: 'back' });
    };
    SenatorVotingHistoryPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-senator-voting-history',
            templateUrl: 'senator-voting-history.html',
        }),
        __metadata("design:paramtypes", [Platform,
            NavController,
            NavParams])
    ], SenatorVotingHistoryPage);
    return SenatorVotingHistoryPage;
}());
export { SenatorVotingHistoryPage };
//# sourceMappingURL=senator-voting-history.js.map