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
import { SeatsConventionsComponent } from '../../components/seats-conventions/seats-conventions';
var SeatsPage = /** @class */ (function () {
    function SeatsPage(platform, navCtrl, modalCtrl, commonProvider, storageProvider, endpointProvider) {
        this.platform = platform;
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.commonProvider = commonProvider;
        this.storageProvider = storageProvider;
        this.endpointProvider = endpointProvider;
        this.search = "";
        this.allSenators = [];
        this.senators = [];
        this.seats = [];
        this.shadowImage = "";
        this.goToArea = function (area) {
            this.shadowImage = 'assets/images/00_' + area + '.png';
            this.senators = this.orderArray(this.allSenators.filter(function (item) {
                return item.seat.sector_id == area;
            }));
        };
        this.backButton();
        this.getSeats();
    }
    SeatsPage.prototype.backButton = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.platform.registerBackButtonAction(function () {
                _this.navCtrl.setRoot('HomePage', {}, { animate: true, direction: 'back' });
            });
        });
    };
    SeatsPage.prototype.onCancel = function () {
        this.search = "";
    };
    SeatsPage.prototype.getSeats = function () {
        var _this = this;
        var cache = this.storageProvider.getCache('seats-list');
        if (cache) {
            this.setData(cache);
        }
        else {
            var loading_1 = this.commonProvider.loading();
            this.endpointProvider.get('seats')
                .subscribe(function (resp) {
                loading_1.dismiss();
                var data = _this.orderArray(resp['response']);
                _this.setData(data);
                _this.storageProvider.setCache('seats-list', _this.allSenators);
            }, function (err) { loading_1.dismiss(); });
        }
    };
    SeatsPage.prototype.setData = function (data) {
        this.allSenators = data;
        this.senators = this.allSenators;
        this.seats = this.allSenators;
    };
    SeatsPage.prototype.orderArray = function (array) {
        return array.sort(function (a, b) { return (a.fullname > b.fullname) ? 1 : ((b.fullname > a.fullname) ? -1 : 0); });
    };
    SeatsPage.prototype.showSenator = function (item) {
        this.navCtrl.setRoot("SenatorProfilePage", { from: 'SeatsPage', senator: item }, { animate: true, direction: 'forward' });
    };
    SeatsPage.prototype.showConventions = function () {
        var _this = this;
        var conventionsModal = this.modalCtrl.create(SeatsConventionsComponent);
        conventionsModal.onDidDismiss(function () {
            _this.backButton();
        });
        conventionsModal.present();
    };
    SeatsPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-seats',
            templateUrl: 'seats.html',
        }),
        __metadata("design:paramtypes", [Platform,
            NavController,
            ModalController,
            CommonProvider,
            StorageProvider,
            EndpointProvider])
    ], SeatsPage);
    return SeatsPage;
}());
export { SeatsPage };
//# sourceMappingURL=seats.js.map