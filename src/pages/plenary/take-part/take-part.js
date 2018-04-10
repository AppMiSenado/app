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
import { CommonProvider } from '../../../providers/common/common';
import { StorageProvider } from '../../../providers/storage/storage';
var TakePartPage = /** @class */ (function () {
    function TakePartPage(platform, navCtrl, navParams, commonProvider, storageProvider) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.commonProvider = commonProvider;
        this.storageProvider = storageProvider;
        this.showVideo = false;
        this.plenary = {
            url: "https://www.youtube.com/watch?v=iiQSWoXFzoI"
        };
        platform.ready().then(function () {
            platform.registerBackButtonAction(function () {
                _this.back();
            });
        });
        this.trustUrl = this.trustSrc(this.storageProvider.get('currentStreaming'));
    }
    TakePartPage.prototype.back = function () {
        this.navCtrl.setRoot('HomePage', {}, { animate: true, direction: 'back' });
    };
    TakePartPage.prototype.ionViewDidLoad = function () {
        this.commonProvider.alertStreaming();
    };
    TakePartPage.prototype.trustSrc = function (url) {
        return this.commonProvider.trustSrc(url);
    };
    TakePartPage.prototype.goBills = function () {
        this.navCtrl.setRoot('BillsListPage', {}, { animate: true, direction: 'forward' });
    };
    TakePartPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-take-part',
            templateUrl: 'take-part.html',
        }),
        __metadata("design:paramtypes", [Platform,
            NavController,
            NavParams,
            CommonProvider,
            StorageProvider])
    ], TakePartPage);
    return TakePartPage;
}());
export { TakePartPage };
//# sourceMappingURL=take-part.js.map