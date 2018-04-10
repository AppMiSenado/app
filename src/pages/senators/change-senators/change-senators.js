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
import { CommonProvider } from '../../../providers/common/common';
import { StorageProvider } from '../../../providers/storage/storage';
import { EndpointProvider } from '../../../providers/endpoint/endpoint';
var ChangeSenatorsPage = /** @class */ (function () {
    function ChangeSenatorsPage(platform, navCtrl, commonProvider, storageProvider, endpointProvider) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.commonProvider = commonProvider;
        this.storageProvider = storageProvider;
        this.endpointProvider = endpointProvider;
        this.search = "";
        this.senators = [];
        this.senatorsSelected = [];
        platform.ready().then(function () {
            platform.registerBackButtonAction(function () {
                _this.navCtrl.setRoot('HomePage', {}, { animate: true, direction: 'back' });
            });
        });
        this.getData();
    }
    ChangeSenatorsPage.prototype.getData = function () {
        var _this = this;
        var loading = this.commonProvider.loading();
        this.endpointProvider.get('citizens/senators?favorite=0')
            .subscribe(function (resp) {
            loading.dismiss();
            _this.senators = resp['response'];
            for (var i = 0; i < _this.senators.length; i++) {
                if (_this.senators[i].favorite) {
                    _this.senatorsSelected.push(_this.senators[i].id);
                }
            }
        }, function (err) {
            loading.dismiss();
        });
    };
    ChangeSenatorsPage.prototype.onCancel = function () {
        this.search = "";
    };
    ChangeSenatorsPage.prototype.validateOptionFilter = function (optionId) {
        return this.senatorsSelected.indexOf(optionId) > -1;
    };
    ChangeSenatorsPage.prototype.toggleOptionFilter = function (optionId) {
        this.storageProvider.destroy('my-senators-list');
        if (this.validateOptionFilter(optionId)) {
            var index = this.senatorsSelected.indexOf(optionId);
            this.senatorsSelected.splice(index, 1);
        }
        else {
            this.senatorsSelected.push(optionId);
        }
        this.endpointProvider.put('citizens/senators/' + optionId, {}).subscribe();
    };
    ChangeSenatorsPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-change-senators',
            templateUrl: 'change-senators.html',
        }),
        __metadata("design:paramtypes", [Platform,
            NavController,
            CommonProvider,
            StorageProvider,
            EndpointProvider])
    ], ChangeSenatorsPage);
    return ChangeSenatorsPage;
}());
export { ChangeSenatorsPage };
//# sourceMappingURL=change-senators.js.map