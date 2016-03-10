System.register(['angular2/core', './car', '../logger.service'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var core_1, car_1, logger_service_1;
    function useInjector() {
        var injector;
        /*
          // Cannot 'new' an Injector like this!
          var injector = new Injector([Car, Engine, Tires, Logger]);
        */
        injector = core_1.Injector.resolveAndCreate([car_1.Car, car_1.Engine, car_1.Tires, logger_service_1.Logger]);
        var car = injector.get(car_1.Car);
        car.description = 'Injector';
        var logger = injector.get(logger_service_1.Logger);
        logger.log('Injector car.drive() said: ' + car.drive());
        return car;
    }
    exports_1("useInjector", useInjector);
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (car_1_1) {
                car_1 = car_1_1;
            },
            function (logger_service_1_1) {
                logger_service_1 = logger_service_1_1;
            }],
        execute: function() {
        }
    }
});
//# sourceMappingURL=car-injector.js.map