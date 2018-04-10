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
import { SocialSharing } from '@ionic-native/social-sharing';
import { CommonProvider } from '../../../providers/common/common';
import { EndpointProvider } from '../../../providers/endpoint/endpoint';
var ShareVotePage = /** @class */ (function () {
    function ShareVotePage(platform, navCtrl, params, socialSharing, endpointProvider, commonProvider) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.params = params;
        this.socialSharing = socialSharing;
        this.endpointProvider = endpointProvider;
        this.commonProvider = commonProvider;
        this.bill = {};
        this.voteId = null;
        this.form = {};
        this.bill = this.params.get('bill');
        this.myVote = this.params.get('myVote');
        platform.ready().then(function () {
            platform.registerBackButtonAction(function () {
                _this.back();
            });
        });
    }
    ShareVotePage.prototype.back = function () {
        this.navCtrl.setRoot('BillsListPage', {}, { animate: true, direction: 'forward' });
    };
    ShareVotePage.prototype.ionViewDidLoad = function () {
        this.saveVote();
    };
    ShareVotePage.prototype.saveVote = function () {
        var _this = this;
        var data = {
            id: this.bill.id,
            vote: this.myVote
        };
        this.endpointProvider.post('plenaries/votes', data).subscribe(function (resp) {
            _this.voteId = resp['response'].id;
        }, function (err) {
            console.log(err);
            _this.commonProvider.toast('La sesión de plenaria se encuentra cerrada, no se puede votar sobre los proyectos discutidos');
            _this.navCtrl.setRoot('HomePage', {}, { animate: true, direction: 'back' });
        });
    };
    ShareVotePage.prototype.doSend = function () {
        var _this = this;
        this.endpointProvider.put('plenaries/comments/' + this.voteId, { comment: this.form.message }).subscribe(function (resp) {
            _this.form.message = "";
            _this.commonProvider.toast('Hemos enviado su mensaje');
        });
    };
    ShareVotePage.prototype.goResults = function () {
        this.navCtrl.setRoot('ResultsPage', { bill: this.bill }, { animate: true, direction: 'forward' });
    };
    ShareVotePage.prototype.share = function () {
        var vote = this.myVote ? 'SI' : 'NO';
        var message = 'Yo he votado ' + vote + ' por el ' + this.bill.name + ' en la aplicación del Senado de Colombia http://www.senado.gov.co';
        var subject = 'Votación Mi Senado Colombia';
        this.socialSharing.share(message, subject, null, 'http://www.senado.gov.co');
    };
    ShareVotePage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-share-vote',
            templateUrl: 'share-vote.html',
        }),
        __metadata("design:paramtypes", [Platform,
            NavController,
            NavParams,
            SocialSharing,
            EndpointProvider,
            CommonProvider])
    ], ShareVotePage);
    return ShareVotePage;
}());
export { ShareVotePage };
//# sourceMappingURL=share-vote.js.map