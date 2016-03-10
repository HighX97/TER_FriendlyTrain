System.register(['angular2/core', './click-me.component', './click-me2.component', './loop-back.component', './keyup.components', './little-tour.component'], function(exports_1, context_1) {
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
    var core_1, click_me_component_1, click_me2_component_1, loop_back_component_1, keyup_components_1, little_tour_component_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (click_me_component_1_1) {
                click_me_component_1 = click_me_component_1_1;
            },
            function (click_me2_component_1_1) {
                click_me2_component_1 = click_me2_component_1_1;
            },
            function (loop_back_component_1_1) {
                loop_back_component_1 = loop_back_component_1_1;
            },
            function (keyup_components_1_1) {
                keyup_components_1 = keyup_components_1_1;
            },
            function (little_tour_component_1_1) {
                little_tour_component_1 = little_tour_component_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                }
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        templateUrl: 'app/app.component.html',
                        directives: [
                            click_me_component_1.ClickMeComponent, click_me2_component_1.ClickMeComponent2,
                            loop_back_component_1.LoopbackComponent,
                            keyup_components_1.KeyUpComponent_v1, keyup_components_1.KeyUpComponent_v2, keyup_components_1.KeyUpComponent_v3, keyup_components_1.KeyUpComponent_v4,
                            little_tour_component_1.LittleTourComponent
                        ]
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map