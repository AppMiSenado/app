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
import { EndpointProvider } from '../../../providers/endpoint/endpoint';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
var NotificationDetailsPage = /** @class */ (function () {
    function NotificationDetailsPage(platform, navCtrl, navParams, endpointProvider, iab, launchNavigator) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.endpointProvider = endpointProvider;
        this.iab = iab;
        this.launchNavigator = launchNavigator;
        this.notification = {};
        platform.ready().then(function () {
            platform.registerBackButtonAction(function () {
                _this.back();
            });
        });
        this.notification = this.navParams.get('notification');
    }
    NotificationDetailsPage.prototype.back = function () {
        this.navCtrl.setRoot('NotificationsListPage', {}, { animate: true, direction: 'back' });
    };
    NotificationDetailsPage.prototype.ionViewDidLoad = function () {
        this.openNotification();
    };
    NotificationDetailsPage.prototype.openNotification = function () {
        var data = {
            whipping_id: this.notification.id
        };
        this.endpointProvider.post('open_incomes', data).subscribe(function () {
        }, function (err) { });
    };
    NotificationDetailsPage.prototype.goToLink = function (url) {
        this.iab.create(url, "_blank");
    };
    NotificationDetailsPage.prototype.goRoute = function () {
        var position = JSON.parse(this.notification.position);
        this.launchNavigator.navigate([position.lat, position.lng])
            .then(function (success) { return console.log('Launched navigator'); }, function (error) { return console.log('Error launching navigator', error); });
    };
    NotificationDetailsPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-notification-details',
            templateUrl: 'notification-details.html',
        }),
        __metadata("design:paramtypes", [Platform,
            NavController,
            NavParams,
            EndpointProvider,
            InAppBrowser,
            LaunchNavigator])
    ], NotificationDetailsPage);
    return NotificationDetailsPage;
}());
export { NotificationDetailsPage };
//# sourceMappingURL=notification-details.js.map