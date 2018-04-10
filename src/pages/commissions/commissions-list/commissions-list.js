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
import { AngularFireDatabase } from 'angularfire2/database';
var CommissionsListPage = /** @class */ (function () {
    function CommissionsListPage(platform, afDB, navCtrl) {
        var _this = this;
        this.afDB = afDB;
        this.navCtrl = navCtrl;
        this.search = "";
        this.commissionsList = [];
        platform.ready().then(function () {
            platform.registerBackButtonAction(function () {
                _this.navCtrl.setRoot('HomePage', {}, { animate: true, direction: 'back' });
            });
        });
    }
    CommissionsListPage.prototype.ionViewDidLoad = function () {
        this.getCommissions();
    };
    CommissionsListPage.prototype.ionViewDidLeave = function () {
        if (this.commissions) {
            this.commissions.unsubscribe();
        }
    };
    CommissionsListPage.prototype.onCancel = function () {
        this.search = "";
    };
    CommissionsListPage.prototype.getCommissions = function () {
        var _this = this;
        this.commissions = this.afDB.object('commissions').snapshotChanges()
            .subscribe(function () {
            _this.afDB.object('commissions').valueChanges()
                .subscribe(function (resp) {
                _this.commissionsList = Object.keys(resp).map(function (key) {
                    resp[key]['$key'] = key;
                    return resp[key];
                });
            });
        });
    };
    CommissionsListPage.prototype.showCommission = function (item) {
        this.navCtrl.setRoot('CommissionDetailsPage', { id: item.id, firebaseId: item.$key }, { animate: true, direction: 'forward' });
    };
    CommissionsListPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-commissions-list',
            templateUrl: 'commissions-list.html',
        }),
        __metadata("design:paramtypes", [Platform,
            AngularFireDatabase,
            NavController])
    ], CommissionsListPage);
    return CommissionsListPage;
}());
export { CommissionsListPage };
//# sourceMappingURL=commissions-list.js.map