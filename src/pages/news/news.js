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
import { EndpointProvider } from '../../providers/endpoint/endpoint';
import { StorageProvider } from '../../providers/storage/storage';
import { CommonProvider } from '../../providers/common/common';
var NewsPage = /** @class */ (function () {
    function NewsPage(platform, navCtrl, iab, endpointProvider, storageProvider, commonProvider) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.iab = iab;
        this.endpointProvider = endpointProvider;
        this.storageProvider = storageProvider;
        this.commonProvider = commonProvider;
        this.search = "";
        this.news = [];
        platform.ready().then(function () {
            platform.registerBackButtonAction(function () {
                _this.navCtrl.setRoot('HomePage', {}, { animate: true, direction: 'back' });
            });
        });
        this.getData();
    }
    NewsPage.prototype.onCancel = function () {
        this.search = "";
    };
    NewsPage.prototype.getData = function () {
        var _this = this;
        var cache = this.storageProvider.getCache('news-list');
        if (cache) {
            this.news = cache;
        }
        else {
            var loading_1 = this.commonProvider.loading();
            this.endpointProvider.get('news').subscribe(function (resp) {
                loading_1.dismiss();
                _this.news = resp['response'];
                _this.storageProvider.setCache('news-list', _this.news);
                console.log(resp['response']);
            }, function (err) {
                loading_1.dismiss();
            });
        }
    };
    NewsPage.prototype.goToLink = function (url) {
        this.iab.create(url, "_blank");
    };
    NewsPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-news',
            templateUrl: 'news.html',
        }),
        __metadata("design:paramtypes", [Platform,
            NavController,
            InAppBrowser,
            EndpointProvider,
            StorageProvider,
            CommonProvider])
    ], NewsPage);
    return NewsPage;
}());
export { NewsPage };
//# sourceMappingURL=news.js.map