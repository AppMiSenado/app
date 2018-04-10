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
import { Platform, IonicPage, NavController } from 'ionic-angular';
import { CommonProvider } from '../../../providers/common/common';
import { EndpointProvider } from '../../../providers/endpoint/endpoint';
import { StorageProvider } from '../../../providers/storage/storage';
var SenatorsListPage = /** @class */ (function () {
    function SenatorsListPage(platform, navCtrl, commonProvider, endpointProvider, storageProvider) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.commonProvider = commonProvider;
        this.endpointProvider = endpointProvider;
        this.storageProvider = storageProvider;
        this.search = "";
        this.senators = [];
        platform.ready().then(function () {
            platform.registerBackButtonAction(function () {
                _this.navCtrl.setRoot('HomePage', {}, { animate: true, direction: 'back' });
            });
        });
        this.getData();
    }
    SenatorsListPage.prototype.onCancel = function () {
        this.search = "";
    };
    SenatorsListPage.prototype.getData = function () {
        var _this = this;
        var cache = this.storageProvider.getCache('senators-list');
        if (cache) {
            this.senators = cache;
        }
        else {
            var loading_1 = this.commonProvider.loading();
            this.endpointProvider.get('citizens/senators?favorite=0')
                .subscribe(function (resp) {
                loading_1.dismiss();
                _this.senators = resp['response'];
                _this.storageProvider.setCache('senators-list', _this.senators);
            }, function (err) {
                loading_1.dismiss();
            });
        }
    };
    SenatorsListPage.prototype.showSenator = function (item) {
        this.navCtrl.setRoot("SenatorProfilePage", { from: 'SenatorsListPage', senator: item }, { animate: true, direction: 'forward' });
    };
    SenatorsListPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-senators-list',
            templateUrl: 'senators-list.html',
        }),
        __metadata("design:paramtypes", [Platform,
            NavController,
            CommonProvider,
            EndpointProvider,
            StorageProvider])
    ], SenatorsListPage);
    return SenatorsListPage;
}());
export { SenatorsListPage };
//# sourceMappingURL=senators-list.js.map