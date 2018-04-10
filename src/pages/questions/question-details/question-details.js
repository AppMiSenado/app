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
import { EndpointProvider } from '../../../providers/endpoint/endpoint';
import { InAppBrowser } from '@ionic-native/in-app-browser';
var QuestionDetailsPage = /** @class */ (function () {
    function QuestionDetailsPage(platform, navCtrl, navParams, commonProvider, endpointProvider, iab) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.commonProvider = commonProvider;
        this.endpointProvider = endpointProvider;
        this.iab = iab;
        this.myVote = null;
        this.question = {};
        this.percentage = {};
        platform.ready().then(function () {
            platform.registerBackButtonAction(function () {
                _this.back();
            });
        });
        this.question = this.navParams.get('question');
        console.log(this.question);
    }
    QuestionDetailsPage.prototype.back = function () {
        this.navCtrl.setRoot('QuestionsListPage', {}, { animate: true, direction: 'back' });
    };
    QuestionDetailsPage.prototype.ionViewDidLoad = function () {
        if (this.question.vote != null) {
            var total = this.question.votes_true_count + this.question.votes_false_count;
            this.percentage.true = this.getProm(total, this.question.votes_true_count);
            this.percentage.false = this.getProm(total, this.question.votes_false_count);
            this.doughnutChartYes = this.commonProvider.generateDoughnutChart(this.doughnutCanvasYes, this.percentage.true, 'rgba(61, 174, 85, 1)');
            this.doughnutChartNo = this.commonProvider.generateDoughnutChart(this.doughnutCanvasNo, this.percentage.false, 'rgba(248, 29, 0, 1)');
        }
    };
    QuestionDetailsPage.prototype.getProm = function (total, value) {
        return Math.round((value * 100) / total);
    };
    QuestionDetailsPage.prototype.goToLink = function (url) {
        this.iab.create(url, "_blank");
    };
    QuestionDetailsPage.prototype.doSend = function () {
        var _this = this;
        var data = {
            survey_id: this.question.id,
            vote: this.myVote
        };
        this.endpointProvider.post('vote_surveys', data).subscribe(function () {
            _this.commonProvider.toast('Hemos enviado su respuesta');
            _this.navCtrl.setRoot('QuestionsListPage', {}, { animate: true, direction: 'back' });
        }, function (err) {
            _this.commonProvider.toast('Ha ocurrido un error. Por favor inténtelo más tarde');
        });
    };
    __decorate([
        ViewChild('doughnutCanvasYes'),
        __metadata("design:type", Object)
    ], QuestionDetailsPage.prototype, "doughnutCanvasYes", void 0);
    __decorate([
        ViewChild('doughnutCanvasNo'),
        __metadata("design:type", Object)
    ], QuestionDetailsPage.prototype, "doughnutCanvasNo", void 0);
    QuestionDetailsPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-question-details',
            templateUrl: 'question-details.html',
        }),
        __metadata("design:paramtypes", [Platform,
            NavController,
            NavParams,
            CommonProvider,
            EndpointProvider,
            InAppBrowser])
    ], QuestionDetailsPage);
    return QuestionDetailsPage;
}());
export { QuestionDetailsPage };
//# sourceMappingURL=question-details.js.map