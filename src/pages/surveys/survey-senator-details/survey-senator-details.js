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
import { Platform, IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommonProvider } from '../../../providers/common/common';
import { InAppBrowser } from '@ionic-native/in-app-browser';
var SurveySenatorDetailsPage = /** @class */ (function () {
    function SurveySenatorDetailsPage(platform, navCtrl, navParams, commonProvider, iab) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.commonProvider = commonProvider;
        this.iab = iab;
        this.myVote = null;
        this.question = {};
        this.percentage = {};
        platform.ready().then(function () {
            platform.registerBackButtonAction(function () {
                _this.back();
            });
        });
        this.question = this.navParams.get('survey');
        console.log(this.question);
    }
    SurveySenatorDetailsPage.prototype.back = function () {
        this.navCtrl.setRoot('SurveyFormPage', {}, { animate: true, direction: 'back' });
    };
    SurveySenatorDetailsPage.prototype.ionViewDidLoad = function () {
        this.generateCharts();
    };
    SurveySenatorDetailsPage.prototype.generateCharts = function () {
        var total = this.question.votes_true_count + this.question.votes_false_count;
        this.percentage.true = this.getProm(total, this.question.votes_true_count);
        this.percentage.false = this.getProm(total, this.question.votes_false_count);
        this.doughnutChartYes = this.commonProvider.generateDoughnutChart(this.doughnutCanvasYes, this.percentage.true, 'rgba(61, 174, 85, 1)');
        this.doughnutChartNo = this.commonProvider.generateDoughnutChart(this.doughnutCanvasNo, this.percentage.false, 'rgba(248, 29, 0, 1)');
    };
    SurveySenatorDetailsPage.prototype.getProm = function (total, value) {
        var result = Math.round((value * 100) / total);
        return isNaN(result) ? 0 : result;
    };
    SurveySenatorDetailsPage.prototype.goToLink = function (url) {
        this.iab.create(url, "_blank");
    };
    __decorate([
        ViewChild('doughnutCanvasYes'),
        __metadata("design:type", Object)
    ], SurveySenatorDetailsPage.prototype, "doughnutCanvasYes", void 0);
    __decorate([
        ViewChild('doughnutCanvasNo'),
        __metadata("design:type", Object)
    ], SurveySenatorDetailsPage.prototype, "doughnutCanvasNo", void 0);
    SurveySenatorDetailsPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-survey-senator-details',
            templateUrl: 'survey-senator-details.html',
        }),
        __metadata("design:paramtypes", [Platform,
            NavController,
            NavParams,
            CommonProvider,
            InAppBrowser])
    ], SurveySenatorDetailsPage);
    return SurveySenatorDetailsPage;
}());
export { SurveySenatorDetailsPage };
//# sourceMappingURL=survey-senator-details.js.map