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
import { EndpointProvider } from '../../providers/endpoint/endpoint';
var FavoritesPage = /** @class */ (function () {
    function FavoritesPage(platform, navCtrl, iab, storageProvider, commonProvider, endpointProvider) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.iab = iab;
        this.storageProvider = storageProvider;
        this.commonProvider = commonProvider;
        this.endpointProvider = endpointProvider;
        this.search = "";
        this.bills = [];
        platform.ready().then(function () {
            platform.registerBackButtonAction(function () {
                _this.navCtrl.setRoot('HomePage', {}, { animate: true, direction: 'back' });
            });
        });
        this.getBills();
    }
    FavoritesPage.prototype.onCancel = function () {
        this.search = "";
    };
    FavoritesPage.prototype.getBills = function () {
        var _this = this;
        var loading = this.commonProvider.loading();
        this.endpointProvider.get('projects')
            .subscribe(function (resp) {
            loading.dismiss();
            _this.bills = resp['response'].filter(function (item) { return item['favorite'] == true; });
        }, function (err) { loading.dismiss(); });
    };
    FavoritesPage.prototype.toggleFavorite = function (e, bill, index) {
        e.preventDefault();
        e.stopPropagation();
        bill.favorite = !bill.favorite;
        this.bills.splice(index, 1);
        if (!this.storageProvider.get('help-remove-favorite')) {
            this.commonProvider.toast('Se removió este Proyecto de ley a sus favoritos');
            this.storageProvider.set('help-remove-favorite', true);
        }
        this.endpointProvider.put('projects/favorite/' + bill.id, {}).subscribe(function (resp) { }, function (err) { });
    };
    FavoritesPage.prototype.goToLink = function (url) {
        this.iab.create(url, "_blank");
    };
    FavoritesPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-favorites',
            templateUrl: 'favorites.html',
        }),
        __metadata("design:paramtypes", [Platform,
            NavController,
            InAppBrowser,
            StorageProvider,
            CommonProvider,
            EndpointProvider])
    ], FavoritesPage);
    return FavoritesPage;
}());
export { FavoritesPage };
//# sourceMappingURL=favorites.js.map