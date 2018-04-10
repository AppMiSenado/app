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
import { Platform, IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommonProvider } from '../../../providers/common/common';
import { EndpointProvider } from '../../../providers/endpoint/endpoint';
var SurveyDetailsPage = /** @class */ (function () {
    function SurveyDetailsPage(platform, navCtrl, navParams, commonProvider, endpointProvider) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.commonProvider = commonProvider;
        this.endpointProvider = endpointProvider;
        this.myVote = null;
        this.question = {};
        platform.ready().then(function () {
            platform.registerBackButtonAction(function () {
                _this.back();
            });
        });
        this.question = this.navParams.get('survey');
    }
    SurveyDetailsPage.prototype.back = function () {
        this.navCtrl.setRoot('SurveyListPage', {}, { animate: true, direction: 'back' });
    };
    SurveyDetailsPage.prototype.ionViewDidLoad = function () {
        this.openSurvey();
    };
    SurveyDetailsPage.prototype.openSurvey = function () {
        var data = {
            poll_id: this.question.id
        };
        this.endpointProvider.post('open_polls', data).subscribe(function () {
        }, function (err) { });
    };
    SurveyDetailsPage.prototype.doSend = function () {
        var _this = this;
        var data = {
            poll_id: this.question.id,
            vote: this.myVote
        };
        this.endpointProvider.post('vote_polls', data).subscribe(function () {
            _this.commonProvider.toast('Hemos enviado su respuesta');
            _this.navCtrl.setRoot('SurveyListPage', {}, { animate: true, direction: 'back' });
        }, function (err) {
            _this.commonProvider.toast('Ha ocurrido un error. Por favor inténtelo más tarde');
        });
    };
    SurveyDetailsPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-survey-details',
            templateUrl: 'survey-details.html',
        }),
        __metadata("design:paramtypes", [Platform,
            NavController,
            NavParams,
            CommonProvider,
            EndpointProvider])
    ], SurveyDetailsPage);
    return SurveyDetailsPage;
}());
export { SurveyDetailsPage };
//# sourceMappingURL=survey-details.js.map