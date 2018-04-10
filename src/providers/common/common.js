var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { DomSanitizer } from '@angular/platform-browser';
import { Injectable } from "@angular/core";
import { LoadingController, ToastController, AlertController } from 'ionic-angular';
import { StorageProvider } from '../storage/storage';
import { Chart } from 'chart.js';
import * as moment from 'moment';
var CommonProvider = /** @class */ (function () {
    function CommonProvider(loadingCtrl, toastCtrl, sanitizer, alertCtrl, storageProvider) {
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.sanitizer = sanitizer;
        this.alertCtrl = alertCtrl;
        this.storageProvider = storageProvider;
    }
    ;
    CommonProvider.prototype.loading = function () {
        var loading = this.loadingCtrl.create({
            spinner: "ios",
            content: ''
        });
        loading.present();
        setTimeout(function () {
            if (loading)
                loading.dismiss();
        }, 7000);
        return loading;
    };
    CommonProvider.prototype.toast = function (string) {
        var toast = this.toastCtrl.create({
            message: string,
            duration: 3000,
            position: 'bottom'
        });
        toast.present();
    };
    CommonProvider.prototype.error = function (error) {
        var errorMessage = JSON.parse(error);
        console.log(errorMessage);
        if (errorMessage.message != undefined) {
            console.log('message');
            this.toast(errorMessage.message);
        }
        else {
            console.log('error');
            this.toast(error);
        }
    };
    CommonProvider.prototype.validateEmail = function (string) {
        var validation = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return validation.test(string);
    };
    CommonProvider.prototype.required = function (string) {
        return (string != "" && string != "" && string != null && string != undefined) ? true : false;
    };
    CommonProvider.prototype.trustSrc = function (url) {
        var video = url.replace('watch?v=', 'embed/');
        return this.sanitizer.bypassSecurityTrustResourceUrl(video);
    };
    CommonProvider.prototype.alertStreaming = function () {
        if (!this.storageProvider.get('streaming')) {
            var alert_1 = this.alertCtrl.create({
                title: 'Cuidado',
                subTitle: 'El vídeo streaming puede consumir muchos datos móviles, le recomendamos estar conectado a una red wifi.',
                buttons: ['Ok']
            });
            this.storageProvider.set('streaming', true);
            alert_1.present();
        }
    };
    CommonProvider.prototype.formatEvents = function (events, attr) {
        return events.map(function (item) {
            item['startTime'] = moment(item[attr[0]]).toDate();
            item['endTime'] = moment(item[attr[1]]).toDate();
            item['allDay'] = false;
            return item;
        });
    };
    CommonProvider.prototype.generateDoughnutChart = function (element, value, color) {
        return new Chart(element.nativeElement, {
            type: 'doughnut',
            options: {
                cutoutPercentage: 70,
                responsive: false,
                maintainAspectRatio: false,
                legend: {
                    display: true
                },
                tooltips: {
                    enabled: false
                },
                layout: {
                    padding: {
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0
                    }
                }
            },
            data: {
                animation: { animateRotate: true },
                datasets: [{
                        data: [100 - value, value],
                        backgroundColor: [
                            'rgba(153, 153, 153, 0.2)',
                            color,
                        ],
                    }]
            }
        });
    };
    CommonProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [LoadingController,
            ToastController,
            DomSanitizer,
            AlertController,
            StorageProvider])
    ], CommonProvider);
    return CommonProvider;
}());
export { CommonProvider };
//# sourceMappingURL=common.js.map