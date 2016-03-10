// Examples with car and engine variations
System.register(['./car'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var car_1;
    var Engine2, MockEngine, MockTires;
    ///////// example 1 ////////////
    function simpleCar() {
        // Simple car with 4 cylinders and Flintstone tires.
        var car = new car_1.Car(new car_1.Engine(), new car_1.Tires());
        car.description = 'Simple';
        return car;
    }
    exports_1("simpleCar", simpleCar);
    function superCar() {
        // Super car with 12 cylinders and Flintstone tires.
        var bigCylinders = 12;
        var car = new car_1.Car(new Engine2(bigCylinders), new car_1.Tires());
        car.description = 'Super';
        return car;
    }
    exports_1("superCar", superCar);
    function testCar() {
        // Test car with 8 cylinders and YokoGoodStone tires.
        var car = new car_1.Car(new MockEngine(), new MockTires());
        car.description = 'Test';
        return car;
    }
    exports_1("testCar", testCar);
    return {
        setters:[
            function (car_1_1) {
                car_1 = car_1_1;
            }],
        execute: function() {
            ///////// example 2 ////////////
            Engine2 = (function () {
                function Engine2(cylinders) {
                    this.cylinders = cylinders;
                }
                return Engine2;
            }());
            /////////// example 3 //////////
            MockEngine = (function (_super) {
                __extends(MockEngine, _super);
                function MockEngine() {
                    _super.apply(this, arguments);
                    this.cylinders = 8;
                }
                return MockEngine;
            }(car_1.Engine));
            MockTires = (function (_super) {
                __extends(MockTires, _super);
                function MockTires() {
                    _super.apply(this, arguments);
                    this.make = "YokoGoodStone";
                }
                return MockTires;
            }(car_1.Tires));
        }
    }
});
//# sourceMappingURL=car-creations.js.map