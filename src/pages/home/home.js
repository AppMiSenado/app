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
import { Platform, IonicPage, NavController, ModalController, AlertController, ToastController, Events } from 'ionic-angular';
import { OfflineComponent } from '../../components/offline/offline';
import { AuthProvider } from '../../providers/auth/auth';
import { StorageProvider } from '../../providers/storage/storage';
import { EndpointProvider } from '../../providers/endpoint/endpoint';
import { AngularFireDatabase } from 'angularfire2/database';
var HomePage = /** @class */ (function () {
    function HomePage(platform, navCtrl, alertCtrl, modalCtrl, toastCtrl, endpointProvider, authProvider, storageProvider, events, afDB) {
        this.platform = platform;
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.toastCtrl = toastCtrl;
        this.endpointProvider = endpointProvider;
        this.authProvider = authProvider;
        this.storageProvider = storageProvider;
        this.events = events;
        this.afDB = afDB;
        this.user = {};
        this.plenaryOnline = false;
        this.commissionsOnline = false;
        this.mySenators = [];
        this.countPolls = 0;
        this.countNotifications = 0;
        this.pages = [
            { title: "Noticias", component: "NewsPage" },
            { title: "Senadores", component: "SenatorsListPage" },
            { title: "Agenda", component: "CalendarPage" },
            { title: "Curules", component: "SeatsPage" },
            { title: "Comisiones", component: "CommissionsListPage" },
            { title: "Streaming", component: "StreamingHistoryPage" },
            { title: "Sala de prensa", component: "PressRoomPage" }
        ];
        this.backButton();
        this.isLogin = this.authProvider.isLogin();
        this.user = this.authProvider.currentSession();
        if (!this.user) {
            this.user = {
                "type": null
            };
        }
    }
    HomePage.prototype.backButton = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.platform.registerBackButtonAction(function () {
                var closeAlert = _this.alertCtrl.create({
                    title: '¿Desea salir de la aplicación?',
                    buttons: [
                        {
                            text: 'Quedarme',
                            role: 'cancel',
                            handler: function () { }
                        },
                        {
                            text: 'Salir',
                            handler: function () {
                                _this.platform.exitApp();
                            }
                        }
                    ]
                });
                closeAlert.present();
            });
        });
    };
    HomePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        if (!this.isLogin) {
            this.events.publish("UPDATE_SIDE_MENU", true);
        }
        this.showsOfflineModal = setTimeout(function () {
            var date = new Date();
            var month = date.getUTCMonth() + 1;
            var day = date.getUTCDate();
            var year = date.getUTCFullYear();
            var cache = _this.storageProvider.getCache('showsOfflineModal-' + day + month + year);
            if (!cache) {
                if (!_this.plenaryOnline && !_this.commissionsOnline) {
                    var offlineModal = _this.modalCtrl.create(OfflineComponent);
                    offlineModal.onDidDismiss(function () {
                        _this.backButton();
                    });
                    offlineModal.present();
                    _this.storageProvider.setCache('showsOfflineModal-' + day + month + year, true);
                }
            }
        }, 7000);
        this.getData();
    };
    HomePage.prototype.ionViewDidLeave = function () {
        if (this.plenary) {
            this.plenary.unsubscribe();
        }
        if (this.commissions) {
            this.commissions.unsubscribe();
        }
        if (this.showsOfflineModal) {
            clearTimeout(this.showsOfflineModal);
        }
    };
    HomePage.prototype.getData = function () {
        this.getMySenators();
        this.getCommissions();
        if (this.user.type == "citizen") {
            this.getCountPolls();
        }
        else if (this.user.type == "senator") {
            this.getCountNotifications();
        }
    };
    HomePage.prototype.getCountPolls = function () {
        var _this = this;
        this.endpointProvider.get('count_polls')
            .subscribe(function (resp) {
            _this.countPolls = resp['response'];
        }, function (err) { });
    };
    HomePage.prototype.getCountNotifications = function () {
        var _this = this;
        this.endpointProvider.get('count_incomes')
            .subscribe(function (resp) {
            _this.countNotifications = resp['response'];
        }, function (err) { });
    };
    HomePage.prototype.getMySenators = function () {
        var _this = this;
        if (this.isLogin) {
            var cache = this.storageProvider.getCache('my-senators-list');
            if (cache && cache.length != 0) {
                this.mySenators = cache;
                this.getPlenary();
            }
            else {
                this.endpointProvider.get('citizens/senators?favorite=1')
                    .subscribe(function (resp) {
                    _this.mySenators = resp['response'];
                    _this.storageProvider.setCache('my-senators-list', _this.mySenators);
                    _this.getPlenary();
                }, function (err) { _this.getPlenary(); });
            }
        }
        else {
            this.getPlenary();
        }
    };
    HomePage.prototype.getPlenary = function () {
        var _this = this;
        this.plenary = this.afDB.object('plenary').snapshotChanges()
            .subscribe(function () {
            _this.afDB.object('plenary').valueChanges()
                .subscribe(function (resp) {
                if (resp && !resp['istest']) {
                    _this.plenaryOnline = true;
                    _this.storageProvider.set('currentStreaming', resp['livestreaming']);
                    _this.valideteAssistence(resp['assistances']);
                }
                else {
                    _this.plenaryOnline = false;
                }
            });
        });
    };
    HomePage.prototype.getCommissions = function () {
        var _this = this;
        this.commissions = this.afDB.object('commissions').snapshotChanges()
            .subscribe(function () {
            _this.afDB.object('commissions').valueChanges()
                .subscribe(function (resp) {
                var commissionsOnline = 0;
                for (var item in resp) {
                    if (resp[item].status) {
                        commissionsOnline++;
                    }
                }
                if (commissionsOnline) {
                    _this.commissionsOnline = true;
                }
                else {
                    _this.commissionsOnline = false;
                }
            });
        });
    };
    HomePage.prototype.valideteAssistence = function (senators) {
        for (var i = 0; i < this.mySenators.length; i++) {
            for (var senator in senators) {
                if (senator == this.mySenators[i].firebase_id) {
                    this.mySenators[i]['attendance'] = senators[senator];
                }
            }
        }
    };
    HomePage.prototype.removeSenator = function (index, name, id) {
        var _this = this;
        name = name.split(" ");
        name = name[name.length - 2] + ' ' + name[name.length - 1];
        var closeAlert = this.alertCtrl.create({
            title: '¿Desea quitar a ' + name + ' de sus senadores favoritos?',
            buttons: [
                {
                    text: 'No',
                    role: 'cancel',
                    handler: function () { }
                },
                {
                    text: 'Si',
                    handler: function () {
                        _this.endpointProvider.put('citizens/senators/' + id, {}).subscribe();
                        _this.mySenators.splice(index, 1);
                    }
                }
            ]
        });
        closeAlert.present();
    };
    HomePage.prototype.messageNoLogin = function () {
        var _this = this;
        var duration = 7000;
        var elapsedTime = 0;
        var intervalHandler = setInterval(function () { elapsedTime += 10; }, 10);
        var toast = this.toastCtrl.create({
            message: "Debe iniciar sesión para acceder a esta sección",
            duration: duration,
            showCloseButton: true,
            closeButtonText: "Ok"
        });
        toast.onDidDismiss(function () {
            clearInterval(intervalHandler);
            if (elapsedTime < duration)
                _this.goLogin();
        });
        toast.present();
    };
    HomePage.prototype.goLogin = function () {
        this.navCtrl.setRoot("LoginPage", {}, { animate: true, direction: "back" });
    };
    HomePage.prototype.goSurveys = function () {
        if (this.isLogin) {
            this.navCtrl.setRoot('SurveyListPage', {}, { animate: true, direction: 'forward' });
        }
        else {
            this.messageNoLogin();
        }
    };
    HomePage.prototype.showSenator = function (item) {
        this.navCtrl.setRoot("SenatorProfilePage", { from: "HomePage", senator: item }, { animate: true, direction: "forward" });
    };
    HomePage.prototype.goToPage = function (page) {
        this.navCtrl.setRoot(page.component, {}, { animate: true, direction: "forward" });
    };
    HomePage.prototype.goQuestions = function () {
        if (this.isLogin) {
            this.navCtrl.setRoot("QuestionsListPage", {}, { animate: true, direction: "forward" });
        }
        else {
            this.messageNoLogin();
        }
    };
    HomePage.prototype.goNotifications = function () {
        this.navCtrl.setRoot("NotificationsListPage", {}, { animate: true, direction: "forward" });
    };
    HomePage.prototype.goSurveysSenator = function () {
        if (this.isLogin) {
            this.navCtrl.setRoot("SurveyFormPage", {}, { animate: true, direction: "forward" });
        }
        else {
            this.messageNoLogin();
        }
    };
    HomePage.prototype.goCommissions = function () {
        this.navCtrl.setRoot("CommissionsListPage", {}, { animate: true, direction: "forward" });
    };
    HomePage.prototype.goAttendance = function () {
        this.navCtrl.setRoot("AttendancePage", {}, { animate: true, direction: "forward" });
    };
    HomePage.prototype.goTakePart = function () {
        if (this.isLogin) {
            this.navCtrl.setRoot("TakePartPage", {}, { animate: true, direction: "forward" });
        }
        else {
            this.messageNoLogin();
        }
    };
    HomePage.prototype.changeSenators = function () {
        if (this.isLogin) {
            this.navCtrl.setRoot("ChangeSenatorsPage", {}, { animate: true, direction: "forward" });
        }
        else {
            this.messageNoLogin();
        }
    };
    HomePage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-home',
            templateUrl: 'home.html',
        }),
        __metadata("design:paramtypes", [Platform,
            NavController,
            AlertController,
            ModalController,
            ToastController,
            EndpointProvider,
            AuthProvider,
            StorageProvider,
            Events,
            AngularFireDatabase])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.js.map