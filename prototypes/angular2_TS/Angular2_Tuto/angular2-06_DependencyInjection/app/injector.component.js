System.register(['angular2/core', './car/car', './heroes/hero.service', './heroes/hero.service.provider', './logger.service'], function(exports_1, context_1) {
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
    var core_1, car_1, hero_service_1, hero_service_provider_1, logger_service_1;
    var InjectorComponent, ROUS;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (car_1_1) {
                car_1 = car_1_1;
            },
            function (hero_service_1_1) {
                hero_service_1 = hero_service_1_1;
            },
            function (hero_service_provider_1_1) {
                hero_service_provider_1 = hero_service_provider_1_1;
            },
            function (logger_service_1_1) {
                logger_service_1 = logger_service_1_1;
            }],
        execute: function() {
            InjectorComponent = (function () {
                function InjectorComponent(_injector) {
                    this._injector = _injector;
                    this.car = this._injector.get(car_1.Car);
                    this.heroService = this._injector.get(hero_service_1.HeroService);
                    this.hero = this.heroService.getHeroes()[0];
                }
                Object.defineProperty(InjectorComponent.prototype, "rodent", {
                    get: function () {
                        var rous = this._injector.getOptional(ROUS);
                        if (rous) {
                            throw new Error('Aaaargh!');
                        }
                        return "R.O.U.S.'s? I don't think they exist!";
                    },
                    enumerable: true,
                    configurable: true
                });
                InjectorComponent = __decorate([
                    core_1.Component({
                        selector: 'my-injectors',
                        template: "\n  <h2>Other Injections</h2>\n  <div id=\"car\"> {{car.drive()}}</div>\n  <div id=\"hero\">{{hero.name}}</div>\n  <div id=\"rodent\">{{rodent}}</div>\n  ",
                        providers: [car_1.Car, car_1.Engine, car_1.Tires,
                            hero_service_provider_1.heroServiceProvider, logger_service_1.Logger]
                    }), 
                    __metadata('design:paramtypes', [core_1.Injector])
                ], InjectorComponent);
                return InjectorComponent;
            }());
            exports_1("InjectorComponent", InjectorComponent);
            /**
             * R.O.U.S. - Rodents Of Unusual Size
             * // https://www.youtube.com/watch?v=BOv5ZjAOpC8
             */
            ROUS = (function () {
                function ROUS() {
                }
                return ROUS;
            }());
        }
    }
});
//# sourceMappingURL=injector.component.js.map