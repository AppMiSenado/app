var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ElementRef, HostListener, Directive } from '@angular/core';
var AutosizeDirective = /** @class */ (function () {
    function AutosizeDirective(element) {
        this.element = element;
    }
    AutosizeDirective.prototype.onInput = function (textArea) {
        this.adjust();
    };
    AutosizeDirective.prototype.onChange = function ($event) {
        var _this = this;
        setTimeout(function () { return _this.adjust(); }, 100);
    };
    AutosizeDirective.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () { return _this.adjust(); }, 0);
    };
    AutosizeDirective.prototype.adjust = function () {
        var textArea = this.element.nativeElement.getElementsByTagName('textarea')[0];
        textArea.style.overflow = 'hidden';
        textArea.style.height = 'auto';
        textArea.style.height = textArea.scrollHeight + "px";
        if (textArea.scrollHeight > 36) {
            textArea.style.marginBottom = "16px";
        }
        else {
            textArea.style.marginBottom = "0px";
        }
    };
    __decorate([
        HostListener('input', ['$event.target']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [HTMLTextAreaElement]),
        __metadata("design:returntype", void 0)
    ], AutosizeDirective.prototype, "onInput", null);
    __decorate([
        HostListener('change'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], AutosizeDirective.prototype, "onChange", null);
    AutosizeDirective = __decorate([
        Directive({
            selector: 'ion-textarea[autosize]'
        }),
        __metadata("design:paramtypes", [ElementRef])
    ], AutosizeDirective);
    return AutosizeDirective;
}());
export { AutosizeDirective };
//# sourceMappingURL=autosize.js.map