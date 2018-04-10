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
import { Platform, IonicPage, NavController, ModalController } from 'ionic-angular';
import { EndpointProvider } from '../../providers/endpoint/endpoint';
import { StorageProvider } from '../../providers/storage/storage';
import { CommonProvider } from '../../providers/common/common';
import { AttendanceConventionsComponent } from '../../components/attendance-conventions/attendance-conventions';
import { AngularFireDatabase } from 'angularfire2/database';
var AttendancePage = /** @class */ (function () {
    function AttendancePage(platform, navCtrl, modalCtrl, commonProvider, storageProvider, endpointProvider, afDB) {
        this.platform = platform;
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.commonProvider = commonProvider;
        this.storageProvider = storageProvider;
        this.endpointProvider = endpointProvider;
        this.afDB = afDB;
        this.search = "";
        this.plenary = null;
        this.allSenators = [];
        this.senators = [];
        this.seats = [];
        this.shadowImage = "";
        this.backButton();
        this.getSeats();
    }
    AttendancePage.prototype.backButton = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.platform.registerBackButtonAction(function () {
                _this.back();
            });
        });
    };
    AttendancePage.prototype.back = function () {
        this.navCtrl.setRoot('HomePage', {}, { animate: true, direction: 'back' });
    };
    AttendancePage.prototype.onCancel = function () {
        this.search = "";
    };
    AttendancePage.prototype.ionViewDidLeave = function () {
        if (this.plenary) {
            this.plenary.unsubscribe();
        }
    };
    AttendancePage.prototype.getSeats = function () {
        var _this = this;
        var cache = this.storageProvider.getCache('seats-list');
        if (cache) {
            this.setValues(cache);
            this.getAttendance();
        }
        else {
            var loading_1 = this.commonProvider.loading();
            this.endpointProvider.get('seats')
                .subscribe(function (resp) {
                loading_1.dismiss();
                _this.setValues(resp['response']);
                _this.storageProvider.setCache('seats-list', resp['response']);
                _this.getAttendance();
            }, function (err) { loading_1.dismiss(); });
        }
    };
    AttendancePage.prototype.setValues = function (response) {
        this.allSenators = this.orderArray(response);
        this.senators = this.allSenators;
        this.seats = this.allSenators;
    };
    AttendancePage.prototype.getAttendance = function () {
        var _this = this;
        this.plenary = this.afDB.object('plenary').snapshotChanges()
            .subscribe(function () {
            _this.afDB.object('plenary').valueChanges()
                .subscribe(function (resp) {
                if (resp && !resp['istest']) {
                    _this.shadowImage = '';
                    for (var assistence in resp['assistances']) {
                        for (var i = 0; i < _this.allSenators.length; i++) {
                            if (assistence == _this.allSenators[i].firebase_id) {
                                _this.allSenators[i].seat['fill'] = resp['assistances'][assistence] ? '#3dae55' : '#f81d00';
                            }
                        }
                    }
                    _this.setValues(_this.allSenators);
                }
            });
        });
    };
    AttendancePage.prototype.goToArea = function (area) {
        this.shadowImage = 'assets/images/00_' + area + '.png';
        this.senators = this.orderArray(this.allSenators.filter(function (item) {
            return item.seat.sector_id == area;
        }));
    };
    AttendancePage.prototype.orderArray = function (array) {
        return array.sort(function (a, b) { return (a.fullname > b.fullname) ? 1 : ((b.fullname > a.fullname) ? -1 : 0); });
    };
    AttendancePage.prototype.showSenator = function (item) {
        this.navCtrl.setRoot("SenatorProfilePage", { from: 'SeatsPage', senator: item }, { animate: true, direction: 'forward' });
    };
    AttendancePage.prototype.showConventions = function () {
        var _this = this;
        var conventionsModal = this.modalCtrl.create(AttendanceConventionsComponent);
        conventionsModal.onDidDismiss(function () {
            _this.backButton();
        });
        conventionsModal.present();
    };
    AttendancePage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-attendance',
            templateUrl: 'attendance.html',
        }),
        __metadata("design:paramtypes", [Platform,
            NavController,
            ModalController,
            CommonProvider,
            StorageProvider,
            EndpointProvider,
            AngularFireDatabase])
    ], AttendancePage);
    return AttendancePage;
}());
export { AttendancePage };
//# sourceMappingURL=attendance.js.map