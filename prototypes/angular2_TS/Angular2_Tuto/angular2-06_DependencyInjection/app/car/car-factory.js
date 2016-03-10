System.register(['./car'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var car_1;
    var CarFactory;
    return {
        setters:[
            function (car_1_1) {
                car_1 = car_1_1;
            }],
        execute: function() {
            // BAD pattern!
            CarFactory = (function () {
                function CarFactory() {
                }
                CarFactory.prototype.createCar = function () {
                    var car = new car_1.Car(this.createEngine(), this.createTires());
                    car.description = 'Factory';
                    return car;
                };
                CarFactory.prototype.createEngine = function () {
                    return new car_1.Engine();
                };
                CarFactory.prototype.createTires = function () {
                    return new car_1.Tires();
                };
                return CarFactory;
            }());
            exports_1("CarFactory", CarFactory);
        }
    }
});
//# sourceMappingURL=car-factory.js.map