var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { Platform, IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { CommonProvider } from '../../../providers/common/common';
import { VotersComponent } from '../../../components/voters/voters';
import { AngularFireDatabase } from 'angularfire2/database';
var ResultsPage = /** @class */ (function () {
    function ResultsPage(platform, navCtrl, params, commonProvider, modalCtrl, afDB) {
        this.platform = platform;
        this.navCtrl = navCtrl;
        this.params = params;
        this.commonProvider = commonProvider;
        this.modalCtrl = modalCtrl;
        this.afDB = afDB;
        this.currentItem = "comunidad";
        this.bill = {};
        this.votesCitizens = [];
        this.votesSenators = [];
        this.bill = this.params.get('bill');
        this.backButton();
    }
    ResultsPage.prototype.backButton = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.platform.registerBackButtonAction(function () {
                _this.back();
            });
        });
    };
    ResultsPage.prototype.ionViewDidLoad = function () {
        this.getPlenary();
    };
    ResultsPage.prototype.ionViewDidLeave = function () {
        if (this.plenary) {
            this.plenary.unsubscribe();
        }
    };
    ResultsPage.prototype.getPlenary = function () {
        var _this = this;
        var billId = this.bill.$key;
        this.plenary = this.afDB.object('plenary/projects/' + billId).snapshotChanges()
            .subscribe(function () {
            _this.afDB.object('plenary/projects/' + billId).valueChanges()
                .subscribe(function (resp) {
                if (resp['votes']['citizens']) {
                    _this.citizensResults(resp['votes']['citizens']);
                }
                if (resp['votes']['senators']) {
                    _this.senatorsResults(resp['votes']['senators']);
                }
            });
        });
    };
    ResultsPage.prototype.getProm = function (total, value) {
        return Math.round((value * 100) / total);
    };
    ResultsPage.prototype.citizensResults = function (votes) {
        this.votesCitizens = {
            true: 0,
            false: 0
        };
        for (var vote in votes) {
            if (votes[vote]) {
                this.votesCitizens.true++;
            }
            else {
                this.votesCitizens.false++;
            }
        }
        var total = this.votesCitizens.true + this.votesCitizens.false;
        this.votesCitizens.true = this.getProm(total, this.votesCitizens.true);
        this.votesCitizens.false = this.getProm(total, this.votesCitizens.false);
        this.doughnutChartYesCommunity = this.commonProvider.generateDoughnutChart(this.doughnutCanvasYesCommunity, this.votesCitizens.true, 'rgba(61, 174, 85, 1)');
        this.doughnutChartNoCommunity = this.commonProvider.generateDoughnutChart(this.doughnutCanvasNoCommunity, this.votesCitizens.false, 'rgba(248, 29, 0, 1)');
    };
    ResultsPage.prototype.senatorsResults = function (votes) {
        this.votesSenators = {
            true: 0,
            false: 0
        };
        for (var vote in votes) {
            if (votes[vote]) {
                this.votesSenators.true++;
            }
            else {
                this.votesSenators.false++;
            }
        }
        var total = this.votesSenators.true + this.votesSenators.false;
        this.votesSenators.true = this.getProm(total, this.votesSenators.true);
        this.votesSenators.false = this.getProm(total, this.votesSenators.false);
        this.doughnutChartYesSenate = this.commonProvider.generateDoughnutChart(this.doughnutCanvasYesSenate, this.votesSenators.true, 'rgba(61, 174, 85, 1)');
        this.doughnutChartNoSenate = this.commonProvider.generateDoughnutChart(this.doughnutCanvasNoSenate, this.votesSenators.false, 'rgba(248, 29, 0, 1)');
    };
    ResultsPage.prototype.back = function () {
        this.navCtrl.setRoot('BillsListPage', {}, { animate: true, direction: 'back' });
    };
    ResultsPage.prototype.goVoters = function (vote) {
        var _this = this;
        var modalVoters = this.modalCtrl.create(VotersComponent, { bill: this.bill, vote: vote });
        modalVoters.onDidDismiss(function () {
            _this.backButton();
        });
        modalVoters.present();
    };
    __decorate([
        ViewChild('doughnutCanvasYesSenate'),
        __metadata("design:type", Object)
    ], ResultsPage.prototype, "doughnutCanvasYesSenate", void 0);
    __decorate([
        ViewChild('doughnutCanvasNoSenate'),
        __metadata("design:type", Object)
    ], ResultsPage.prototype, "doughnutCanvasNoSenate", void 0);
    __decorate([
        ViewChild('doughnutCanvasYesCommunity'),
        __metadata("design:type", Object)
    ], ResultsPage.prototype, "doughnutCanvasYesCommunity", void 0);
    __decorate([
        ViewChild('doughnutCanvasNoCommunity'),
        __metadata("design:type", Object)
    ], ResultsPage.prototype, "doughnutCanvasNoCommunity", void 0);
    ResultsPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-results',
            templateUrl: 'results.html',
        }),
        __metadata("design:paramtypes", [Platform,
            NavController,
            NavParams,
            CommonProvider,
            ModalController,
            AngularFireDatabase])
    ], ResultsPage);
    return ResultsPage;
}());
export { ResultsPage };
//# sourceMappingURL=results.js.map