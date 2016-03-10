System.register(['angular2/core'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var ClickMeComponent2;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            ClickMeComponent2 = (function () {
                function ClickMeComponent2() {
                    this.clickMessage = '';
                    this.clicks = 1;
                }
                ClickMeComponent2.prototype.onClickMe2 = function (event) {
                    var evtMsg = event ? ' Event target is ' + event.target.tagName : '';
                    this.clickMessage = ("Click #" + this.clicks++ + ". " + evtMsg);
                };
                ClickMeComponent2 = __decorate([
                    core_1.Component({
                        selector: 'click-me2',
                        template: "\n    <button (click)=\"onClickMe2($event)\">No! .. Click me!</button>\n    {{clickMessage}}"
                    }), 
                    __metadata('design:paramtypes', [])
                ], ClickMeComponent2);
                return ClickMeComponent2;
            }());
            exports_1("ClickMeComponent2", ClickMeComponent2);
        }
    }
});
//# sourceMappingURL=click-me.component2.js.map