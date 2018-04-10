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
import { Platform, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
var CustomNotificationComponent = /** @class */ (function () {
    function CustomNotificationComponent(platform, navCtrl, navParams, iab, launchNavigator) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.iab = iab;
        this.launchNavigator = launchNavigator;
        this.notification = {};
        platform.ready().then(function () {
            platform.registerBackButtonAction(function () {
                _this.back();
            });
        });
        this.notification = this.navParams.get('notification');
        console.log(this.notification);
    }
    CustomNotificationComponent.prototype.back = function () {
        this.navCtrl.setRoot('HomePage', {}, { animate: true, direction: 'back' });
    };
    CustomNotificationComponent = __decorate([
        Component({
            selector: 'custom-notification',
            templateUrl: 'custom-notification.html'
        }),
        __metadata("design:paramtypes", [Platform,
            NavController,
            NavParams,
            InAppBrowser,
            LaunchNavigator])
    ], CustomNotificationComponent);
    return CustomNotificationComponent;
}());
export { CustomNotificationComponent };
//# sourceMappingURL=custom-notification.js.map