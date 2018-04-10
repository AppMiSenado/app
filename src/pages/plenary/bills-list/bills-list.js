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
import { BillDetailsComponent } from '../../../components/bill-details/bill-details';
import { AuthProvider } from '../../../providers/auth/auth';
import { AngularFireDatabase } from 'angularfire2/database';
var BillsListPage = /** @class */ (function () {
    function BillsListPage(platform, navCtrl, modalCtrl, authProvider, afDB) {
        this.platform = platform;
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.authProvider = authProvider;
        this.afDB = afDB;
        this.user = {};
        this.search = "";
        this.bills = [];
        this.backButton();
        this.user = this.authProvider.currentSession();
    }
    BillsListPage.prototype.backButton = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.platform.registerBackButtonAction(function () {
                _this.back();
            });
        });
    };
    BillsListPage.prototype.ionViewDidLoad = function () {
        this.getPlenaty();
    };
    BillsListPage.prototype.ionViewDidLeave = function () {
        if (this.plenary) {
            this.plenary.unsubscribe();
        }
    };
    BillsListPage.prototype.getPlenaty = function () {
        var _this = this;
        this.plenary = this.afDB.object('plenary/projects').snapshotChanges()
            .subscribe(function () {
            _this.afDB.object('plenary/projects').valueChanges()
                .subscribe(function (resp) {
                if (resp) {
                    _this.bills = Object.keys(resp).map(function (key) {
                        resp[key]['$key'] = key;
                        return resp[key];
                    }).sort(function (a, b) {
                        return a.status > b.status ? 1 : 0;
                    });
                }
                else {
                    _this.navCtrl.setRoot('HomePage', {}, { animate: true, direction: 'back' });
                }
            });
        });
    };
    BillsListPage.prototype.back = function () {
        this.navCtrl.setRoot('TakePartPage', {}, { animate: true, direction: 'back' });
    };
    BillsListPage.prototype.showResume = function (bill) {
        var _this = this;
        bill['existVote'] = false;
        if (bill.votes && bill.votes['citizens']) {
            for (var vote in bill.votes['citizens']) {
                if (this.user.firebase_id == vote) {
                    bill['existVote'] = true;
                }
            }
        }
        var modalResume = this.modalCtrl.create(BillDetailsComponent, { bill: bill });
        modalResume.onDidDismiss(function () {
            _this.backButton();
        });
        modalResume.present();
    };
    BillsListPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-bills-list',
            templateUrl: 'bills-list.html',
        }),
        __metadata("design:paramtypes", [Platform,
            NavController,
            ModalController,
            AuthProvider,
            AngularFireDatabase])
    ], BillsListPage);
    return BillsListPage;
}());
export { BillsListPage };
//# sourceMappingURL=bills-list.js.map