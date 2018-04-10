var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ChangeDetectorRef } from '@angular/core';
import { Platform, IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { CommissionDescriptionComponent } from '../../../components/commission-description/commission-description';
import { CommonProvider } from '../../../providers/common/common';
import { StorageProvider } from '../../../providers/storage/storage';
import { AuthProvider } from '../../../providers/auth/auth';
import { EndpointProvider } from '../../../providers/endpoint/endpoint';
import { AngularFireDatabase } from 'angularfire2/database';
var CommissionDetailsPage = /** @class */ (function () {
    function CommissionDetailsPage(platform, navCtrl, navParams, chRef, modalCtrl, iab, commonProvider, screenOrientation, endpointProvider, storageProvider, authProvider, afDB) {
        this.platform = platform;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.chRef = chRef;
        this.modalCtrl = modalCtrl;
        this.iab = iab;
        this.commonProvider = commonProvider;
        this.screenOrientation = screenOrientation;
        this.endpointProvider = endpointProvider;
        this.storageProvider = storageProvider;
        this.authProvider = authProvider;
        this.afDB = afDB;
        this.BLOCK_TIME = 300000;
        this.isDisabledComment = false;
        this.setTimeIsDisabledComment = null;
        this.commission = {};
        this.comment = "";
        this.comments = [];
        this.trustUrl = null;
        this.trustUrlLive = null;
        this.links = [];
        this.section = "integrantes";
        this.senators = [];
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
        this.user = this.authProvider.currentSession();
        if (!this.user) {
            this.user = {
                type: null
            };
        }
    }
    CommissionDetailsPage.prototype.backButton = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.platform.registerBackButtonAction(function () {
                _this.back();
            });
        });
    };
    CommissionDetailsPage.prototype.back = function () {
        this.navCtrl.setRoot('CommissionsListPage', {}, { animate: true, direction: 'back' });
    };
    CommissionDetailsPage.prototype.ionViewDidLoad = function () {
        this.screenOrientation.unlock();
        this.getData();
    };
    CommissionDetailsPage.prototype.ionViewWillLeave = function () {
        this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
        if (this.commissionsRealTime) {
            this.commissionsRealTime.unsubscribe();
        }
        if (this.setTimeIsDisabledComment) {
            clearInterval(this.setTimeIsDisabledComment);
        }
    };
    CommissionDetailsPage.prototype.getData = function () {
        this.getCommision();
        this.getRealTimeCommission();
    };
    CommissionDetailsPage.prototype.getCommision = function () {
        var _this = this;
        var cache = this.storageProvider.getCache('commission-details-' + this.navParams.get('id'));
        if (cache) {
            this.senators = cache['senators'];
            this.getStreaming(cache['histories']);
        }
        else {
            var loading_1 = this.commonProvider.loading();
            this.endpointProvider.get('commissions/' + this.navParams.get('id'))
                .subscribe(function (resp) {
                loading_1.dismiss();
                _this.senators = resp['response']['senators'];
                _this.getStreaming(resp['response']['histories']);
                _this.storageProvider.setCache('commission-details-' + _this.navParams.get('id'), resp['response']);
            }, function (err) { loading_1.dismiss(); });
        }
        this.commentMessage();
    };
    CommissionDetailsPage.prototype.commentMessage = function () {
        var _this = this;
        this.lastCommentMessage();
        this.setTimeIsDisabledComment = setInterval(function () {
            _this.lastCommentMessage();
        }, 60000);
    };
    CommissionDetailsPage.prototype.lastCommentMessage = function () {
        var lastComment = this.storageProvider.get('last-comment-commission-' + this.navParams.get('id')) || 0;
        this.isDisabledComment = new Date().getTime() - lastComment < this.BLOCK_TIME ? true : false;
        console.log(this.isDisabledComment);
        return this.isDisabledComment;
    };
    CommissionDetailsPage.prototype.getEvents = function (date) {
        var _this = this;
        var cache = this.storageProvider.getCache('event-list-commission-' + this.navParams.get('id') + date);
        if (cache) {
            this.eventSource = this.commonProvider.formatEvents(cache, ['startTime', 'endTime']);
        }
        else {
            var loading_2 = this.commonProvider.loading();
            var params = "?commission_id=" + this.navParams.get('id');
            if (date) {
                params += '&date=' + date;
            }
            this.endpointProvider.get('events' + params)
                .subscribe(function (resp) {
                loading_2.dismiss();
                if (resp) {
                    _this.eventSource = _this.commonProvider.formatEvents(resp['response'], ['published_at', 'published_at']);
                    _this.storageProvider.setCache('event-list-commission-' + _this.navParams.get('id') + date, _this.eventSource);
                }
            }, function (err) { loading_2.dismiss(); });
        }
    };
    CommissionDetailsPage.prototype.getStreaming = function (history) {
        this.links = history;
        for (var i = 0; i < this.links.length; i++) {
            if (i == 0) {
                this.activeStreaming(this.links[i].youtube_id);
                break;
            }
        }
    };
    CommissionDetailsPage.prototype.activeStreaming = function (url) {
        this.activeUrl = url;
        url = "https://www.youtube.com/embed/" + url;
        this.trustUrl = this.trustSrc(url);
    };
    CommissionDetailsPage.prototype.getRealTimeCommission = function () {
        var _this = this;
        var id = this.navParams.get('firebaseId');
        this.commissionsRealTime = this.afDB.object('commissions/' + id).snapshotChanges()
            .subscribe(function () {
            _this.afDB.object('commissions/' + id).valueChanges()
                .subscribe(function (resp) {
                _this.commission = resp;
                console.log(resp);
                if (_this.trustUrlLive == null && _this.commission.livestreaming) {
                    console.log(_this.trustUrlLive);
                    _this.trustUrlLive = _this.trustSrc(_this.commission.livestreaming);
                }
                if (_this.commission.comments) {
                    _this.comments = Object.keys(_this.commission.comments).map(function (key) {
                        return _this.commission.comments[key];
                    })
                        .filter(function (item) { return item['status'] == true; })
                        .sort(function (a, b) { return (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0); });
                }
            });
        });
    };
    CommissionDetailsPage.prototype.showDescription = function () {
        var _this = this;
        var modalDescription = this.modalCtrl.create(CommissionDescriptionComponent, { commission: this.commission });
        modalDescription.onDidDismiss(function () {
            _this.backButton();
        });
        modalDescription.present();
    };
    CommissionDetailsPage.prototype.showSenator = function (item) {
        this.navCtrl.setRoot("SenatorProfilePage", { from: 'CommissionDetailsPage', id: this.navParams.get('id'), firebaseId: this.navParams.get('firebaseId'), senator: item }, { animate: true, direction: 'forward' });
    };
    CommissionDetailsPage.prototype.onCurrentDateChanged = function (event) {
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        event.setHours(0, 0, 0, 0);
        this.isToday = today.getTime() === event.getTime();
        this.onChangeMonth(event);
    };
    CommissionDetailsPage.prototype.onChangeMonth = function (event) {
        this.title = event;
        var date = new Date(event);
        var currentMonth = (date.getMonth() + 1);
        date = date.getFullYear() + '-' + currentMonth + '-' + date.getDate();
        if (this.currentMonth != currentMonth) {
            this.currentMonth = currentMonth;
            this.getEvents(date);
        }
    };
    CommissionDetailsPage.prototype.onTimeSelected = function (ev) {
        this.title = ev.selectedTime;
        console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
            (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
    };
    CommissionDetailsPage.prototype.onViewTitleChanged = function (title) {
        this.viewTitle = title;
    };
    CommissionDetailsPage.prototype.sendComment = function () {
        var data = {
            message: this.comment,
            email: this.user.email,
            date: new Date().getTime(),
            citizen: this.user.firebase_id
        };
        console.log(data);
        var comments = this.afDB.list('commissions/' + this.navParams.get('firebaseId') + '/comments');
        comments.push(data);
        this.comment = "";
        this.chRef.detectChanges();
        this.storageProvider.set('last-comment-commission-' + this.navParams.get('id'), new Date().getTime());
        this.isDisabledComment = true;
        this.commonProvider.toast('Gracias, su mensaje está sujeto aprobación');
    };
    CommissionDetailsPage.prototype.goToLink = function (url) {
        this.iab.create(url, "_blank");
    };
    CommissionDetailsPage.prototype.trustSrc = function (url) {
        return this.commonProvider.trustSrc(url);
    };
    CommissionDetailsPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-commission-details',
            templateUrl: 'commission-details.html',
        }),
        __metadata("design:paramtypes", [Platform,
            NavController,
            NavParams,
            ChangeDetectorRef,
            ModalController,
            InAppBrowser,
            CommonProvider,
            ScreenOrientation,
            EndpointProvider,
            StorageProvider,
            AuthProvider,
            AngularFireDatabase])
    ], CommissionDetailsPage);
    return CommissionDetailsPage;
}());
export { CommissionDetailsPage };
//# sourceMappingURL=commission-details.js.map