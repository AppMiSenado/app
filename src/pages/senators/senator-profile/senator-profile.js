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
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { StorageProvider } from '../../../providers/storage/storage';
import { EndpointProvider } from '../../../providers/endpoint/endpoint';
import { CommonProvider } from '../../../providers/common/common';
var SenatorProfilePage = /** @class */ (function () {
    function SenatorProfilePage(platform, params, navCtrl, storageProvider, endpointProvider, commonProvider, iab) {
        var _this = this;
        this.params = params;
        this.navCtrl = navCtrl;
        this.storageProvider = storageProvider;
        this.endpointProvider = endpointProvider;
        this.commonProvider = commonProvider;
        this.iab = iab;
        this.socialFeedInit = null;
        this.senator = {};
        this.histories = [];
        platform.ready().then(function () {
            platform.registerBackButtonAction(function () {
                _this.back();
            });
        });
        this.senator = this.params.get('senator');
    }
    SenatorProfilePage.prototype.back = function () {
        var params = {};
        var id = this.params.get('id');
        var firebaseId = this.params.get('firebaseId');
        if (id && firebaseId) {
            params['id'] = id;
            params['firebaseId'] = firebaseId;
        }
        var from = this.params.get('from');
        if (!from) {
            from = 'HomePage';
        }
        this.navCtrl.setRoot(from, params, { animate: true, direction: 'back' });
    };
    SenatorProfilePage.prototype.ngOnInit = function () {
        this.loading = true;
        this.getHistories();
        this.initSocialFeed();
    };
    SenatorProfilePage.prototype.getHistories = function () {
        var _this = this;
        var cache = this.storageProvider.getCache('senator-history-' + this.senator['id']);
        if (cache && cache.length != 0) {
            this.senator['history'] = cache['history'];
        }
        else {
            var loading_1 = this.commonProvider.loading();
            this.endpointProvider.get('senators/' + this.senator['id'])
                .subscribe(function (resp) {
                loading_1.dismiss();
                _this.senator['history'] = resp['response']['history'];
                _this.storageProvider.setCache('senator-history-' + _this.senator['id'], _this.senator);
            }, function (err) { console.log(err); });
        }
    };
    SenatorProfilePage.prototype.initSocialFeed = function () {
        var _this = this;
        var self = this;
        var config = {
            length: 20,
            show_media: true,
            media_min_width: 300,
            template_html: "<div class='social-feed-element {{? !it.moderation_passed}}hidden{{?}}' dt-create='{{=it.dt_create}}' social-feed-id = '{{=it.id}}'>\n          <div class='content'>\n              <div class='media-body'>\n                  <p>\n                      <i class='social-network-icon icon-{{=it.social_network}}'></i>\n                      <span class='muted pull-right'> {{=it.time_ago}}</span> \n                  </p>\n                  <p class='social-feed-text'>{{=it.text}} <a href='{{=it.link}}' target='_blank' class='read-button'>Ver m\u00E1s</a></p>\n              </div>\n          </div>\n          {{=it.attachment}}\n      </div>",
            date_format: "ll",
            date_locale: "es",
        };
        if (this.senator.contacts.socialNetworks && this.senator.contacts.socialNetworks.twitter) {
            config['twitter'] = {
                accounts: ['@' + this.senator.contacts.socialNetworks.twitter],
                limit: 10,
                consumer_key: 'XjqU16kih4IyyVrXGuktHQXOI',
                consumer_secret: 'ExGCAkyNswfEJRCwRPEcvnSuQZ3sJwEBG6XsPdRUS2HdxZn7cL'
            };
        }
        if (this.senator.contacts.socialNetworks && this.senator.contacts.socialNetworks.facebook) {
            config['facebook'] = {
                accounts: ['@' + this.senator.contacts.socialNetworks.facebook, '!' + this.senator.contacts.socialNetworks.facebook],
                limit: 10,
                access_token: '198336894063403|4047a1c4995aa05e34dc63a812926684'
            };
        }
        this.socialFeedInit = $('#social-feed-container').socialfeed(config);
        setTimeout(function () {
            _this.loading = false;
        }, 2000);
        $(document).on('click', '.social-feed-element a', function (e) {
            e.preventDefault();
            e.stopPropagation();
            self.iab.create($(this).attr('href'));
        });
    };
    SenatorProfilePage.prototype.goToLink = function (url) {
        this.iab.create(url, "_blank");
    };
    SenatorProfilePage.prototype.goVotingHistory = function () {
        this.navCtrl.setRoot('SenatorVotingHistoryPage', { senator: this.senator }, { animate: true, direction: 'forward' });
    };
    SenatorProfilePage.prototype.goAttendenceHistory = function () {
        this.navCtrl.setRoot('SenatorAttendanceHistoryPage', { senator: this.senator }, { animate: true, direction: 'forward' });
    };
    SenatorProfilePage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-senator-profile',
            templateUrl: 'senator-profile.html',
        }),
        __metadata("design:paramtypes", [Platform,
            NavParams,
            NavController,
            StorageProvider,
            EndpointProvider,
            CommonProvider,
            InAppBrowser])
    ], SenatorProfilePage);
    return SenatorProfilePage;
}());
export { SenatorProfilePage };
//# sourceMappingURL=senator-profile.js.map