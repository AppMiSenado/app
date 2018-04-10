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
import { Platform, IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { CommonProvider } from '../../providers/common/common';
import { StorageProvider } from '../../providers/storage/storage';
import { EndpointProvider } from '../../providers/endpoint/endpoint';
import { CalendarConventionsComponent } from '../../components/calendar-conventions/calendar-conventions';
var CalendarPage = /** @class */ (function () {
    function CalendarPage(platform, navCtrl, navParams, commonProvider, endpointProvider, modalCtrl, storageProvider, iab) {
        this.platform = platform;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.commonProvider = commonProvider;
        this.endpointProvider = endpointProvider;
        this.modalCtrl = modalCtrl;
        this.storageProvider = storageProvider;
        this.iab = iab;
        this.eventSource = [];
        this.currentMonth = 0;
        this.calendar = {
            mode: 'month',
            currentDate: new Date(),
            dateFormatter: {
                formatMonthViewDay: function (date) {
                    return date.getDate().toString();
                }
            }
        };
        this.backButton();
    }
    CalendarPage.prototype.backButton = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.platform.registerBackButtonAction(function () {
                _this.navCtrl.setRoot('HomePage', {}, { animate: true, direction: 'back' });
            });
        });
    };
    CalendarPage.prototype.getEvents = function (date) {
        var _this = this;
        var cache = this.storageProvider.getCache('event-list-' + date);
        if (cache) {
            this.eventSource = this.commonProvider.formatEvents(cache, ['startTime', 'endTime']);
        }
        else {
            var loading_1 = this.commonProvider.loading();
            var params = "";
            if (date) {
                params = '?date=' + date;
            }
            this.endpointProvider.get('events' + params)
                .subscribe(function (resp) {
                loading_1.dismiss();
                if (resp) {
                    _this.eventSource = _this.commonProvider.formatEvents(resp['response'], ['published_at', 'published_at']);
                    _this.storageProvider.setCache('event-list-' + date, _this.eventSource);
                }
            }, function (err) { loading_1.dismiss(); });
        }
    };
    CalendarPage.prototype.onCurrentDateChanged = function (event) {
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        event.setHours(0, 0, 0, 0);
        this.isToday = today.getTime() === event.getTime();
        this.onChangeMonth(event);
    };
    CalendarPage.prototype.onTimeSelected = function (ev) {
        this.title = ev.selectedTime;
    };
    CalendarPage.prototype.onChangeMonth = function (event) {
        this.title = event;
        var date = new Date(event);
        var currentMonth = (date.getMonth() + 1);
        date = date.getFullYear() + '-' + currentMonth + '-' + date.getDate();
        if (this.currentMonth != currentMonth) {
            this.currentMonth = currentMonth;
            this.getEvents(date);
        }
    };
    CalendarPage.prototype.onViewTitleChanged = function (title) {
        this.viewTitle = title;
    };
    CalendarPage.prototype.showConventions = function () {
        var _this = this;
        var modalConventions = this.modalCtrl.create(CalendarConventionsComponent);
        modalConventions.onDidDismiss(function () {
            _this.backButton();
        });
        modalConventions.present();
    };
    CalendarPage.prototype.goToLink = function (url) {
        this.iab.create(url, "_blank");
    };
    CalendarPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-calendar',
            templateUrl: 'calendar.html',
        }),
        __metadata("design:paramtypes", [Platform,
            NavController,
            NavParams,
            CommonProvider,
            EndpointProvider,
            ModalController,
            StorageProvider,
            InAppBrowser])
    ], CalendarPage);
    return CalendarPage;
}());
export { CalendarPage };
//# sourceMappingURL=calendar.js.map