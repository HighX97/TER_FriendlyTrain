System.register(['./car'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var car_1;
    var Car;
    return {
        setters:[
            function (car_1_1) {
                car_1 = car_1_1;
            }],
        execute: function() {
            Car = (function () {
                function Car() {
                    this.description = 'No DI';
                    this.engine = new car_1.Engine();
                    this.tires = new car_1.Tires();
                }
                // Method using the engine and tires
                Car.prototype.drive = function () {
                    return (this.description + " car with ") +
                        (this.engine.cylinders + " cylinders and " + this.tires.make + " tires.");
                };
                return Car;
            }());
            exports_1("Car", Car);
        }
    }
});
//# sourceMappingURL=car-no-di.js.map