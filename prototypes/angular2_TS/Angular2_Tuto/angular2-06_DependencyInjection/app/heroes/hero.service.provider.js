System.register(['angular2/core', './hero.service', '../logger.service', '../user.service'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var core_1, hero_service_1, logger_service_1, user_service_1;
    var heroServiceFactory, heroServiceProvider;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (hero_service_1_1) {
                hero_service_1 = hero_service_1_1;
            },
            function (logger_service_1_1) {
                logger_service_1 = logger_service_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            }],
        execute: function() {
            heroServiceFactory = function (logger, userService) {
                return new hero_service_1.HeroService(logger, userService.user.isAuthorized);
            };
            exports_1("heroServiceProvider", heroServiceProvider = core_1.provide(hero_service_1.HeroService, {
                useFactory: heroServiceFactory,
                deps: [logger_service_1.Logger, user_service_1.UserService]
            }));
        }
    }
});
//# sourceMappingURL=hero.service.provider.js.map