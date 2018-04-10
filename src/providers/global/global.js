var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from "@angular/core";
var GlobalProvider = /** @class */ (function () {
    function GlobalProvider() {
        this.APP_STATE = "DEPLOY";
        this.URL = {
            "DEPLOY": "http://35.192.52.213/misenado/backend/api/app/v1/",
            "PRODUCTION": "http://104.197.198.130/misenado/backend/api/app/v1/"
        };
        this.APP_KEY = "qvzjv76nsVBu2r5JYLTyUD602uDzaABnNAbBBYUoJnqJ16YyrJOIHvOrc1zC";
        //public ONESIGNAL_KEY:          string = "8eb7fc3f-0635-4860-927d-a04115af69f8";
        //public ONESIGNAL_APP_ID:       string = "198931659381";
        this.ONESIGNAL_KEY = "da155e89-5ab6-479d-883c-c46ac2da53a8";
        this.ONESIGNAL_APP_ID = "340466445023";
        this.ON_UNAUTHORIZED_GO_TO = "LoginPage";
        this.VERSION_URL = "http://version.uberflug.co/api/v1/version";
        this.API_URL = this.URL[this.APP_STATE];
    }
    GlobalProvider.prototype.getApiUrl = function (complement) {
        if (typeof complement == "undefined") {
            complement = "";
        }
        return this.API_URL + complement;
    };
    GlobalProvider = __decorate([
        Injectable()
    ], GlobalProvider);
    return GlobalProvider;
}());
export { GlobalProvider };
//# sourceMappingURL=global.js.map