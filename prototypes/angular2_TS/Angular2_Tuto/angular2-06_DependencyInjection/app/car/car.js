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
    var Engine, Tires, Car;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            Engine = (function () {
                function Engine() {
                    this.cylinders = 4; // default
                }
                return Engine;
            }());
            exports_1("Engine", Engine);
            Tires = (function () {
                function Tires() {
                    this.make = 'Flintstone';
                    this.model = 'Square';
                }
                return Tires;
            }());
            exports_1("Tires", Tires);
            Car = (function () {
                function Car(engine, tires) {
                    this.engine = engine;
                    this.tires = tires;
                    this.description = 'DI';
                }
                // Method using the engine and tires
                Car.prototype.drive = function () {
                    return (this.description + " car with ") +
                        (this.engine.cylinders + " cylinders and " + this.tires.make + " tires.");
                };
                Car = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [Engine, Tires])
                ], Car);
                return Car;
            }());
            exports_1("Car", Car);
        }
    }
});
//# sourceMappingURL=car.js.map