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
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { StorageProvider } from '../../providers/storage/storage';
import { CommonProvider } from '../../providers/common/common';
import { AuthProvider } from '../../providers/auth/auth';
import { EndpointProvider } from '../../providers/endpoint/endpoint';
var BillsPage = /** @class */ (function () {
    function BillsPage(platform, navCtrl, iab, storageProvider, commonProvider, authProvider, endpointProvider) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.iab = iab;
        this.storageProvider = storageProvider;
        this.commonProvider = commonProvider;
        this.authProvider = authProvider;
        this.endpointProvider = endpointProvider;
        this.userType = {};
        this.isLogin = false;
        this.search = "";
        this.bills = [];
        platform.ready().then(function () {
            platform.registerBackButtonAction(function () {
                _this.navCtrl.setRoot('HomePage', {}, { animate: true, direction: 'back' });
            });
        });
        this.isLogin = this.authProvider.isLogin();
        var user = this.authProvider.currentSession();
        if (user) {
            this.userType = user.type;
        }
        this.getBills();
    }
    BillsPage.prototype.onCancel = function () {
        this.search = "";
    };
    BillsPage.prototype.getBills = function () {
        var _this = this;
        var cache = this.storageProvider.getCache('bills-list');
        if (cache) {
            this.bills = cache;
        }
        else {
            var loading_1 = this.commonProvider.loading();
            this.endpointProvider.get('projects')
                .subscribe(function (resp) {
                loading_1.dismiss();
                _this.bills = resp['response'];
                _this.storageProvider.setCache('bills-list', _this.bills);
            }, function (err) { loading_1.dismiss(); });
        }
    };
    BillsPage.prototype.toggleFavorite = function (e, bill) {
        e.preventDefault();
        e.stopPropagation();
        bill.favorite = !bill.favorite;
        if (!this.storageProvider.get('help-favorite')) {
            this.commonProvider.toast('Se agregó este Proyecto de ley a sus favoritos');
            this.storageProvider.set('help-favorite', true);
        }
        this.storageProvider.set('bills-list', this.bills);
        this.endpointProvider.put('projects/favorite/' + bill.id, {}).subscribe(function (resp) { }, function (err) { });
    };
    BillsPage.prototype.goToLink = function (url) {
        this.iab.create(url, "_blank");
    };
    BillsPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-bills',
            templateUrl: 'bills.html',
        }),
        __metadata("design:paramtypes", [Platform,
            NavController,
            InAppBrowser,
            StorageProvider,
            CommonProvider,
            AuthProvider,
            EndpointProvider])
    ], BillsPage);
    return BillsPage;
}());
export { BillsPage };
//# sourceMappingURL=bills.js.map