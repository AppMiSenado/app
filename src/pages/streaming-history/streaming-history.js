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
import { CommonProvider } from '../../providers/common/common';
import { StorageProvider } from '../../providers/storage/storage';
import { EndpointProvider } from '../../providers/endpoint/endpoint';
var StreamingHistoryPage = /** @class */ (function () {
    function StreamingHistoryPage(platform, navCtrl, navParams, commonProvider, storageProvider, endpointProvider) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.commonProvider = commonProvider;
        this.storageProvider = storageProvider;
        this.endpointProvider = endpointProvider;
        this.links = [];
        platform.ready().then(function () {
            platform.registerBackButtonAction(function () {
                _this.navCtrl.setRoot('HomePage', {}, { animate: true, direction: 'back' });
            });
        });
    }
    StreamingHistoryPage.prototype.ionViewDidLoad = function () {
        this.getStreaming();
    };
    StreamingHistoryPage.prototype.getStreaming = function () {
        var _this = this;
        var cache = this.storageProvider.getCache('streaming-list');
        if (cache) {
            this.links = cache;
            this.activeFirstLink(this.links);
        }
        else {
            var loading_1 = this.commonProvider.loading();
            this.endpointProvider.get('plenaries')
                .subscribe(function (resp) {
                loading_1.dismiss();
                _this.links = resp['response'];
                _this.storageProvider.setCache('streaming-list', _this.links);
                _this.activeFirstLink(_this.links);
            }, function (err) { loading_1.dismiss(); });
        }
    };
    StreamingHistoryPage.prototype.activeFirstLink = function (links) {
        for (var i = 0; i < links.length; i++) {
            if (i == 0) {
                this.activeStreaming(links[i].youtube_id);
                break;
            }
        }
    };
    StreamingHistoryPage.prototype.activeStreaming = function (url) {
        this.activeUrl = url;
        url = "https://www.youtube.com/embed/" + url;
        this.trustUrl = this.trustSrc(url);
    };
    StreamingHistoryPage.prototype.trustSrc = function (url) {
        return this.commonProvider.trustSrc(url);
    };
    StreamingHistoryPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-streaming-history',
            templateUrl: 'streaming-history.html',
        }),
        __metadata("design:paramtypes", [Platform,
            NavController,
            NavParams,
            CommonProvider,
            StorageProvider,
            EndpointProvider])
    ], StreamingHistoryPage);
    return StreamingHistoryPage;
}());
export { StreamingHistoryPage };
//# sourceMappingURL=streaming-history.js.map