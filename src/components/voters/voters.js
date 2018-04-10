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
import { Platform, ViewController, NavParams } from 'ionic-angular';
import { EndpointProvider } from '../../providers/endpoint/endpoint';
import { CommonProvider } from '../../providers/common/common';
var VotersComponent = /** @class */ (function () {
    function VotersComponent(platform, params, viewCtrl, commonProvider, endpointProvider) {
        var _this = this;
        this.params = params;
        this.viewCtrl = viewCtrl;
        this.commonProvider = commonProvider;
        this.endpointProvider = endpointProvider;
        this.senators = [];
        platform.ready().then(function () {
            platform.registerBackButtonAction(function () {
                _this.dismiss();
            });
        });
        this.vote = this.params.get('vote');
        this.getData(this.vote);
    }
    VotersComponent.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    VotersComponent.prototype.getData = function (vote) {
        var _this = this;
        var loading = this.commonProvider.loading();
        this.endpointProvider.get('plenaries/results/' + this.params.get('bill').$key).subscribe(function (resp) {
            loading.dismiss();
            _this.senators = resp['response'].filter(function (item) {
                return item.vote == vote;
            }, vote);
        }, function (err) { loading.dismiss(); });
    };
    VotersComponent = __decorate([
        Component({
            selector: 'voters',
            templateUrl: 'voters.html'
        }),
        __metadata("design:paramtypes", [Platform,
            NavParams,
            ViewController,
            CommonProvider,
            EndpointProvider])
    ], VotersComponent);
    return VotersComponent;
}());
export { VotersComponent };
//# sourceMappingURL=voters.js.map