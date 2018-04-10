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
import { Platform, Content, ViewController } from 'ionic-angular';
import { CommonProvider } from '../../providers/common/common';
import { EndpointProvider } from '../../providers/endpoint/endpoint';
var SignupDataComponent = /** @class */ (function () {
    function SignupDataComponent(platform, viewCtrl, commonProvider, endpointProvider) {
        var _this = this;
        this.viewCtrl = viewCtrl;
        this.commonProvider = commonProvider;
        this.endpointProvider = endpointProvider;
        this.search = "";
        this.data = {};
        this.items = [];
        this.selectAllState = {};
        platform.ready().then(function () {
            platform.registerBackButtonAction(function () {
                _this.dismiss(false);
            });
        });
    }
    SignupDataComponent.prototype.ionViewDidLoad = function () {
        this.getFilters();
    };
    SignupDataComponent.prototype.dismiss = function (data) {
        this.viewCtrl.dismiss({ data: data });
    };
    SignupDataComponent.prototype.getFilters = function () {
        var _this = this;
        var loading = this.commonProvider.loading();
        this.endpointProvider.get('citizens/filters')
            .subscribe(function (data) {
            loading.dismiss();
            _this.items = data['response'];
            _this.currentItem = 0;
        }, function (err) {
            loading.dismiss();
        });
    };
    SignupDataComponent.prototype.onCancel = function () {
        this.search = "";
    };
    SignupDataComponent.prototype.resizeContent = function (option) {
        this.search = "";
        this.currentItem = option;
        this.content.resize();
        this.content.scrollToTop();
    };
    SignupDataComponent.prototype.selectAll = function (category, items, isUnique) {
        var _this = this;
        if (!this.selectAllState[category]) {
            this.data[category] = [];
            items.forEach(function (item) {
                _this.data[category].push(item.id);
            });
        }
        else {
            this.data[category] = [];
        }
        this.selectAllState[category] = !this.selectAllState[category];
    };
    SignupDataComponent.prototype.validateOptionFilter = function (category, optionId, isUnique) {
        if (this.data.hasOwnProperty(category)) {
            if (!isUnique) {
                return this.data[category].indexOf(optionId) > -1;
            }
            else if (isUnique && optionId == this.data[category]) {
                return true;
            }
            return false;
        }
        return false;
    };
    SignupDataComponent.prototype.toggleOptionFilter = function (category, optionId, isUnique) {
        if (isUnique) {
            this.data[category] = optionId;
        }
        else {
            if (!this.data.hasOwnProperty(category)) {
                this.data[category] = [];
                this.data[category].push(optionId);
            }
            else {
                if (this.validateOptionFilter(category, optionId, isUnique)) {
                    var index = this.data[category].indexOf(optionId);
                    this.data[category].splice(index, 1);
                }
                else {
                    this.data[category].push(optionId);
                }
            }
        }
    };
    SignupDataComponent.prototype.returnData = function () {
        this.dismiss(this.data);
    };
    __decorate([
        ViewChild(Content),
        __metadata("design:type", Content)
    ], SignupDataComponent.prototype, "content", void 0);
    SignupDataComponent = __decorate([
        Component({
            selector: 'signup-data',
            templateUrl: 'signup-data.html',
        }),
        __metadata("design:paramtypes", [Platform,
            ViewController,
            CommonProvider,
            EndpointProvider])
    ], SignupDataComponent);
    return SignupDataComponent;
}());
export { SignupDataComponent };
//# sourceMappingURL=signup-data.js.map