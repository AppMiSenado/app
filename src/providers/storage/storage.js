var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from "@angular/core";
var StorageProvider = /** @class */ (function () {
    function StorageProvider() {
        this.EXPIRE = 14400000; //4h
    }
    StorageProvider.prototype.set = function (key, value) {
        return localStorage.setItem(key, JSON.stringify(value));
    };
    StorageProvider.prototype.get = function (key) {
        return JSON.parse(localStorage.getItem(key));
    };
    StorageProvider.prototype.destroy = function (key) {
        return localStorage.removeItem(key);
    };
    StorageProvider.prototype.getCache = function (key) {
        var data = this.get(key);
        if (data) {
            var now = new Date().getTime();
            var time = this.get('date-' + key);
            if ((now - time) < this.EXPIRE) {
                return data;
            }
        }
        return false;
    };
    StorageProvider.prototype.setCache = function (key, data) {
        var now = new Date().getTime();
        this.set('date-' + key, now);
        this.set(key, data);
    };
    StorageProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [])
    ], StorageProvider);
    return StorageProvider;
}());
export { StorageProvider };
//# sourceMappingURL=storage.js.map