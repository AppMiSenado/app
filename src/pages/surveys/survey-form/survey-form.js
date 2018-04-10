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
var SurveyFormPage = /** @class */ (function () {
    function SurveyFormPage(platform, navCtrl, navParams, commonProvider, endpointProvider) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.commonProvider = commonProvider;
        this.endpointProvider = endpointProvider;
        this.form = {};
        this.surveys = [];
        platform.ready().then(function () {
            platform.registerBackButtonAction(function () {
                _this.back();
            });
        });
    }
    SurveyFormPage.prototype.back = function () {
        this.navCtrl.setRoot('HomePage', {}, { animate: true, direction: 'back' });
    };
    SurveyFormPage.prototype.ionViewDidLoad = function () {
        this.getData();
    };
    SurveyFormPage.prototype.getData = function () {
        var _this = this;
        var loading = this.commonProvider.loading();
        this.endpointProvider.get('polls').subscribe(function (resp) {
            loading.dismiss();
            _this.surveys = resp['response'];
        }, function (err) {
            loading.dismiss();
        });
    };
    SurveyFormPage.prototype.showSurvey = function (item) {
        this.navCtrl.setRoot("SurveySenatorDetailsPage", { survey: item }, { animate: true, direction: 'forward' });
    };
    SurveyFormPage.prototype.doSend = function () {
        var _this = this;
        this.endpointProvider.post('polls', this.form).subscribe(function (resp) {
            _this.commonProvider.toast('Hemos enviado su encuesta a todos sus seguidores');
            _this.form = {};
            _this.surveys.unshift(resp['response']);
        }, function (err) {
            _this.commonProvider.toast('Ha ocurrido un error. Por favor inténtelo más tarde');
        });
    };
    SurveyFormPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-survey-form',
            templateUrl: 'survey-form.html',
        }),
        __metadata("design:paramtypes", [Platform,
            NavController,
            NavParams,
            CommonProvider,
            EndpointProvider])
    ], SurveyFormPage);
    return SurveyFormPage;
}());
export { SurveyFormPage };
//# sourceMappingURL=survey-form.js.map