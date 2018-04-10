var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Injectable } from '@angular/core';
import { App, ModalController, AlertController, Events } from 'ionic-angular';
import { AuthProvider } from '../auth/auth';
import { CommonProvider } from '../common/common';
import { EndpointProvider } from '../endpoint/endpoint';
import { SignupDataComponent } from '../../components/signup-data/signup-data';
import { TermsComponent } from '../../components/terms/terms';
import { Facebook } from '@ionic-native/facebook';
import { TwitterConnect } from '@ionic-native/twitter-connect';
import { OneSignal } from '@ionic-native/onesignal';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
var FirebaseProvider = /** @class */ (function () {
    function FirebaseProvider(endponintProvider, app, modalCtrl, alertCtrl, authProvider, commonProvider, oneSignal, afAuth, events, fb, tw) {
        this.endponintProvider = endponintProvider;
        this.app = app;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.authProvider = authProvider;
        this.commonProvider = commonProvider;
        this.oneSignal = oneSignal;
        this.afAuth = afAuth;
        this.events = events;
        this.fb = fb;
        this.tw = tw;
        this.fromNetwork = false;
        var self = this;
        $(document).on('click', '.terms', function (e) {
            e.preventDefault();
            e.stopPropagation();
            self.goTerms();
        });
    }
    FirebaseProvider.prototype.messageError = function (error) {
        console.log(error);
        switch (error.code) {
            case 'auth/user-not-found':
                return 'Los datos son incorrectos.';
            case 'auth/network-request-failed':
                return 'Ha ocurrido una falla en la conexión.';
            case 'auth/account-exists-with-different-credential':
                return 'Ya existe una cuenta con el mismo correo electrónico pero con diferentes credenciales de inicio de sesión.';
            case 'auth/email-already-in-use':
                return 'El correo electrónico ya está registrado.';
            case 'auth/argument-error':
                return 'El correo electrónico no parece ser valido.';
            case 'auth/weak-password':
                return 'La contraseña debe ser mayor de 6 digitos.';
            default:
                return 'Algo ha ocurrido, por favor vuelva a intentarlo.';
        }
    };
    ;
    FirebaseProvider.prototype.login = function (email, password) {
        return __awaiter(this, void 0, void 0, function () {
            var response, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.loading = this.commonProvider.loading();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.afAuth.auth.signInWithEmailAndPassword(email, password)];
                    case 2:
                        response = _a.sent();
                        if (response.uid) {
                            this.backendAuthentication(response.uid, email, false);
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        this.loading.dismiss();
                        this.commonProvider.toast(this.messageError(e_1));
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    FirebaseProvider.prototype.network = function (network) {
        this.loading = this.commonProvider.loading();
        if (network == 'facebook') {
            this.loginWithFacebook();
        }
        else if (network == 'twitter') {
            this.loginWithTwitter();
        }
    };
    ;
    FirebaseProvider.prototype.loginWithFacebook = function () {
        var _this = this;
        console.log('entre Facebook');
        this.fb.login(['public_profile', 'email'])
            .then(function (result) {
            console.log('response Facebook', result);
            var credential = firebase.auth.FacebookAuthProvider.credential(result.authResponse.accessToken);
            console.log(credential);
            _this.afAuth.auth.signInWithCredential(credential)
                .then(function (success) {
                _this.fromNetwork = true;
                _this.backendAuthentication(success.uid, success.email, false);
            })
                .catch(function (error) {
                _this.loading.dismiss();
                _this.commonProvider.toast(_this.messageError(error));
            });
        })
            .catch(function (e) {
            _this.loading.dismiss();
            console.log(e);
        });
    };
    FirebaseProvider.prototype.loginWithTwitter = function () {
        var _this = this;
        this.tw.login()
            .then(function (result) {
            var credential = firebase.auth.TwitterAuthProvider.credential(result.token, result.secret);
            _this.afAuth.auth.signInWithCredential(credential)
                .then(function (success) {
                _this.fromNetwork = true;
                _this.backendAuthentication(success.uid, success.email, false);
            })
                .catch(function (error) {
                _this.loading.dismiss();
                _this.commonProvider.toast(_this.messageError(error));
            });
        })
            .catch(function (e) {
            _this.loading.dismiss();
            console.log(e);
        });
    };
    FirebaseProvider.prototype.createAccount = function (email, password, data) {
        return __awaiter(this, void 0, void 0, function () {
            var response, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.loading = this.commonProvider.loading();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.afAuth.auth.createUserWithEmailAndPassword(email, password)];
                    case 2:
                        response = _a.sent();
                        if (response.uid) {
                            this.backendAuthentication(response.uid, email, data);
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _a.sent();
                        this.loading.dismiss();
                        this.commonProvider.toast(this.messageError(e_2));
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    FirebaseProvider.prototype.backendAuthentication = function (firebaseID, email, data) {
        var _this = this;
        this.oneSignal.getIds().then(function (dataOneSignal) {
            var sendData = {};
            if (data) {
                sendData = data;
                sendData["notifications"] = {
                    all: true,
                    plenary: true
                };
            }
            sendData["email"] = email;
            sendData["firebase_id"] = firebaseID;
            sendData["onesignal_id"] = dataOneSignal.userId;
            if (data) {
                _this.apiSignup(sendData);
            }
            else {
                _this.apiLogin(sendData);
            }
        });
    };
    FirebaseProvider.prototype.apiLogin = function (data) {
        var _this = this;
        this.endponintProvider.post('auth', data)
            .subscribe(function (res) {
            _this.loading.dismiss();
            _this.authProvider.updateDataUser(res['response']);
            _this.events.publish("UPDATE_SIDE_MENU", true);
            _this.app.getRootNavs()[0].setRoot("HomePage", {}, { animate: true, direction: 'forward' });
        }, function (err) {
            _this.loading.dismiss();
            console.log(err);
            if (_this.fromNetwork) {
                _this.requiereSignup(data);
            }
            else {
                _this.commonProvider.toast("Datos incorrectos");
            }
        });
    };
    FirebaseProvider.prototype.requiereSignup = function (data) {
        var _this = this;
        var modalextraData = this.modalCtrl.create(SignupDataComponent);
        modalextraData.onDidDismiss(function (response) {
            if (response.data) {
                var alert_1 = _this.alertCtrl.create({
                    title: 'Términos y Condiciones',
                    message: 'Cuando se registra está aceptando los <a class="terms">Términos y Condiciones</a> de esta aplicación',
                    buttons: [
                        {
                            text: 'No acepto',
                            role: 'cancel',
                            handler: function () { }
                        },
                        {
                            text: 'Acepto',
                            handler: function () {
                                _this.backendAuthentication(data.firebase_id, data.email, response.data);
                            }
                        }
                    ]
                });
                alert_1.present();
            }
        });
        modalextraData.present();
    };
    FirebaseProvider.prototype.apiSignup = function (data) {
        var _this = this;
        this.endponintProvider.post('citizens', data)
            .subscribe(function (res) {
            _this.loading.dismiss();
            _this.authProvider.updateDataUser(res['response']);
            _this.events.publish("UPDATE_SIDE_MENU", true);
            _this.app.getRootNavs()[0].setRoot("HomePage", {}, { animate: true, direction: 'forward' });
        }, function (err) {
            _this.loading.dismiss();
            console.log(err);
            _this.commonProvider.toast("Datos incorrectos");
        });
    };
    FirebaseProvider.prototype.recoverPassword = function (email) {
        var _this = this;
        this.loading = this.commonProvider.loading();
        this.afAuth.auth.sendPasswordResetEmail(email).then(function (success) {
            _this.loading.dismiss();
            _this.commonProvider.toast('Revise su correo electrónico, le hemos enviado los pasos para restablecer su contraseña');
        })
            .catch(function (error) {
            _this.loading.dismiss();
            _this.commonProvider.toast(_this.messageError(error));
        });
    };
    FirebaseProvider.prototype.changePassword = function (email) {
        var _this = this;
        this.loading = this.commonProvider.loading();
        this.afAuth.auth.sendPasswordResetEmail(email).then(function (success) {
            _this.loading.dismiss();
            _this.commonProvider.toast('Revise su correo electrónico, le hemos enviado los pasos para cambiar su contraseña');
        })
            .catch(function (error) {
            _this.loading.dismiss();
            _this.commonProvider.toast(_this.messageError(error));
        });
    };
    FirebaseProvider.prototype.goTerms = function () {
        var modalTerms = this.modalCtrl.create(TermsComponent);
        modalTerms.present();
    };
    FirebaseProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [EndpointProvider,
            App,
            ModalController,
            AlertController,
            AuthProvider,
            CommonProvider,
            OneSignal,
            AngularFireAuth,
            Events,
            Facebook,
            TwitterConnect])
    ], FirebaseProvider);
    return FirebaseProvider;
}());
export { FirebaseProvider };
//# sourceMappingURL=firebase.js.map