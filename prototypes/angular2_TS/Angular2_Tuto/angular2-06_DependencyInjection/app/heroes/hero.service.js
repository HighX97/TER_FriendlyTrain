System.register(['angular2/core', './mock-heroes', '../logger.service'], function(exports_1, context_1) {
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
    var core_1, mock_heroes_1, logger_service_1;
    var HeroService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (mock_heroes_1_1) {
                mock_heroes_1 = mock_heroes_1_1;
            },
            function (logger_service_1_1) {
                logger_service_1 = logger_service_1_1;
            }],
        execute: function() {
            HeroService = (function () {
                function HeroService(_logger, _isAuthorized) {
                    this._logger = _logger;
                    this._isAuthorized = _isAuthorized;
                }
                HeroService.prototype.getHeroes = function () {
                    var _this = this;
                    var auth = this._isAuthorized ? 'authorized ' : 'unauthorized';
                    this._logger.log("Getting heroes for " + auth + " user.");
                    return mock_heroes_1.HEROES.filter(function (hero) { return _this._isAuthorized || !hero.isSecret; });
                };
                HeroService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof logger_service_1.Logger !== 'undefined' && logger_service_1.Logger) === 'function' && _a) || Object, Boolean])
                ], HeroService);
                return HeroService;
                var _a;
            }());
            exports_1("HeroService", HeroService);
        }
    }
});
//# sourceMappingURL=hero.service.js.map