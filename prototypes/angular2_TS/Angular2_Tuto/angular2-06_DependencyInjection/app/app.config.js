System.register(['angular2/core'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var core_1;
    var APP_CONFIG, CONFIG;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            exports_1("APP_CONFIG", APP_CONFIG = new core_1.OpaqueToken('app.config'));
            exports_1("CONFIG", CONFIG = {
                apiEndpoint: 'api.heroes.com',
                title: 'Dependency Injection'
            });
        }
    }
});
//# sourceMappingURL=app.config.js.map