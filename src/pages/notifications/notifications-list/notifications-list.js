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
import { EndpointProvider } from '../../../providers/endpoint/endpoint';
var NotificationsListPage = /** @class */ (function () {
    function NotificationsListPage(platform, navCtrl, navParams, commonProvider, endpointProvider) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.commonProvider = commonProvider;
        this.endpointProvider = endpointProvider;
        this.notifications = [];
        platform.ready().then(function () {
            platform.registerBackButtonAction(function () {
                _this.back();
            });
        });
    }
    NotificationsListPage.prototype.back = function () {
        this.navCtrl.setRoot('HomePage', {}, { animate: true, direction: 'back' });
    };
    NotificationsListPage.prototype.ionViewDidLoad = function () {
        this.getData();
    };
    NotificationsListPage.prototype.getData = function () {
        var _this = this;
        var loading = this.commonProvider.loading();
        this.endpointProvider.get('incomes').subscribe(function (resp) {
            loading.dismiss();
            _this.notifications = resp['response'];
        }, function (err) {
            loading.dismiss();
        });
    };
    NotificationsListPage.prototype.showNotification = function (item) {
        this.navCtrl.setRoot("NotificationDetailsPage", { notification: item }, { animate: true, direction: 'forward' });
    };
    NotificationsListPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-notifications-list',
            templateUrl: 'notifications-list.html',
        }),
        __metadata("design:paramtypes", [Platform,
            NavController,
            NavParams,
            CommonProvider,
            EndpointProvider])
    ], NotificationsListPage);
    return NotificationsListPage;
}());
export { NotificationsListPage };
//# sourceMappingURL=notifications-list.js.map