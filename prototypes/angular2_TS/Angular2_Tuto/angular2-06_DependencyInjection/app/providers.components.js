System.register(['angular2/core', './app.config', './heroes/hero.service', './heroes/hero.service.provider', './logger.service', './user.service'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, app_config_1, hero_service_1, hero_service_provider_1, logger_service_1, user_service_1, core_2;
    var template, ProviderComponent1, ProviderComponent2, ProviderComponent3, BetterLogger, ProviderComponent4, EvenBetterLogger, ProviderComponent5, NewLogger, OldLogger, ProviderComponent6a, ProviderComponent6b, silentLogger, ProviderComponent7, ProviderComponent8, ProviderComponent9a, ProviderComponent9b, ProviderComponent10a, ProviderComponent10b, ProvidersComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
                core_2 = core_1_1;
            },
            function (app_config_1_1) {
                app_config_1 = app_config_1_1;
            },
            function (hero_service_1_1) {
                hero_service_1 = hero_service_1_1;
            },
            function (hero_service_provider_1_1) {
                hero_service_provider_1 = hero_service_provider_1_1;
            },
            function (logger_service_1_1) {
                logger_service_1 = logger_service_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            }],
        execute: function() {
            template = '{{log}}';
            //////////////////////////////////////////
            ProviderComponent1 = (function () {
                function ProviderComponent1(logger) {
                    logger.log('Hello from logger provided with Logger class');
                    this.log = logger.logs[0];
                }
                ProviderComponent1 = __decorate([
                    core_1.Component({
                        selector: 'provider-1',
                        template: template,
                        providers: [logger_service_1.Logger]
                    }), 
                    __metadata('design:paramtypes', [logger_service_1.Logger])
                ], ProviderComponent1);
                return ProviderComponent1;
            }());
            exports_1("ProviderComponent1", ProviderComponent1);
            //////////////////////////////////////////
            ProviderComponent2 = (function () {
                function ProviderComponent2(logger) {
                    logger.log('Hello from logger provided with Provider class and useClass');
                    this.log = logger.logs[0];
                }
                ProviderComponent2 = __decorate([
                    core_1.Component({
                        selector: 'provider-2',
                        template: template,
                        providers: [new core_1.Provider(logger_service_1.Logger, { useClass: logger_service_1.Logger })]
                    }), 
                    __metadata('design:paramtypes', [logger_service_1.Logger])
                ], ProviderComponent2);
                return ProviderComponent2;
            }());
            exports_1("ProviderComponent2", ProviderComponent2);
            //////////////////////////////////////////
            ProviderComponent3 = (function () {
                function ProviderComponent3(logger) {
                    logger.log('Hello from logger provided with useClass');
                    this.log = logger.logs[0];
                }
                ProviderComponent3 = __decorate([
                    core_1.Component({
                        selector: 'provider-3',
                        template: template,
                        providers: [core_1.provide(logger_service_1.Logger, { useClass: logger_service_1.Logger })]
                    }), 
                    __metadata('design:paramtypes', [logger_service_1.Logger])
                ], ProviderComponent3);
                return ProviderComponent3;
            }());
            exports_1("ProviderComponent3", ProviderComponent3);
            //////////////////////////////////////////
            BetterLogger = (function (_super) {
                __extends(BetterLogger, _super);
                function BetterLogger() {
                    _super.apply(this, arguments);
                }
                return BetterLogger;
            }(logger_service_1.Logger));
            ProviderComponent4 = (function () {
                function ProviderComponent4(logger) {
                    logger.log('Hello from logger provided with useClass:BetterLogger');
                    this.log = logger.logs[0];
                }
                ProviderComponent4 = __decorate([
                    core_1.Component({
                        selector: 'provider-4',
                        template: template,
                        providers: [core_1.provide(logger_service_1.Logger, { useClass: BetterLogger })]
                    }), 
                    __metadata('design:paramtypes', [logger_service_1.Logger])
                ], ProviderComponent4);
                return ProviderComponent4;
            }());
            exports_1("ProviderComponent4", ProviderComponent4);
            //////////////////////////////////////////
            EvenBetterLogger = (function () {
                function EvenBetterLogger(_userService) {
                    this._userService = _userService;
                    this.logs = [];
                }
                EvenBetterLogger.prototype.log = function (message) {
                    message = "Message to " + this._userService.user.name + ": " + message + ".";
                    console.log(message);
                    this.logs.push(message);
                };
                EvenBetterLogger = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof user_service_1.UserService !== 'undefined' && user_service_1.UserService) === 'function' && _a) || Object])
                ], EvenBetterLogger);
                return EvenBetterLogger;
                var _a;
            }());
            ProviderComponent5 = (function () {
                function ProviderComponent5(logger) {
                    logger.log('Hello from EvenBetterlogger');
                    this.log = logger.logs[0];
                }
                ProviderComponent5 = __decorate([
                    core_1.Component({
                        selector: 'provider-5',
                        template: template,
                        providers: [user_service_1.UserService,
                            core_1.provide(logger_service_1.Logger, { useClass: EvenBetterLogger })]
                    }), 
                    __metadata('design:paramtypes', [logger_service_1.Logger])
                ], ProviderComponent5);
                return ProviderComponent5;
            }());
            exports_1("ProviderComponent5", ProviderComponent5);
            //////////////////////////////////////////
            NewLogger = (function (_super) {
                __extends(NewLogger, _super);
                function NewLogger() {
                    _super.apply(this, arguments);
                }
                return NewLogger;
            }(logger_service_1.Logger));
            OldLogger = (function () {
                function OldLogger() {
                    this.logs = [];
                }
                OldLogger.prototype.log = function (message) {
                    throw new Error('Should not call the old logger!');
                };
                ;
                return OldLogger;
            }());
            ProviderComponent6a = (function () {
                function ProviderComponent6a(newLogger, oldLogger) {
                    if (newLogger === oldLogger) {
                        throw new Error('expected the two loggers to be different instances');
                    }
                    oldLogger.log('Hello OldLogger (but we want NewLogger)');
                    // The newLogger wasn't called so no logs[]
                    // display the logs of the oldLogger.
                    this.log = newLogger.logs[0] || oldLogger.logs[0];
                }
                ProviderComponent6a = __decorate([
                    core_1.Component({
                        selector: 'provider-6a',
                        template: template,
                        providers: [NewLogger,
                            // Not aliased! Creates two instances of `NewLogger`
                            core_1.provide(OldLogger, { useClass: NewLogger })]
                    }), 
                    __metadata('design:paramtypes', [NewLogger, OldLogger])
                ], ProviderComponent6a);
                return ProviderComponent6a;
            }());
            exports_1("ProviderComponent6a", ProviderComponent6a);
            ProviderComponent6b = (function () {
                function ProviderComponent6b(newLogger, oldLogger) {
                    if (newLogger !== oldLogger) {
                        throw new Error('expected the two loggers to be the same instance');
                    }
                    oldLogger.log('Hello from NewLogger (via aliased OldLogger)');
                    this.log = newLogger.logs[0];
                }
                ProviderComponent6b = __decorate([
                    core_1.Component({
                        selector: 'provider-6b',
                        template: template,
                        providers: [NewLogger,
                            // Alias OldLogger w/ reference to NewLogger
                            core_1.provide(OldLogger, { useExisting: NewLogger })]
                    }), 
                    __metadata('design:paramtypes', [NewLogger, OldLogger])
                ], ProviderComponent6b);
                return ProviderComponent6b;
            }());
            exports_1("ProviderComponent6b", ProviderComponent6b);
            //////////////////////////////////////////
            // An object in the shape of the logger service
            silentLogger = {
                logs: ['Silent logger says "Shhhhh!". Provided via "useValue"'],
                log: function () { }
            };
            ProviderComponent7 = (function () {
                function ProviderComponent7(logger) {
                    logger.log('Hello from logger provided with useValue');
                    this.log = logger.logs[0];
                }
                ProviderComponent7 = __decorate([
                    core_1.Component({
                        selector: 'provider-7',
                        template: template,
                        providers: [core_1.provide(logger_service_1.Logger, { useValue: silentLogger })]
                    }), 
                    __metadata('design:paramtypes', [logger_service_1.Logger])
                ], ProviderComponent7);
                return ProviderComponent7;
            }());
            exports_1("ProviderComponent7", ProviderComponent7);
            /////////////////
            ProviderComponent8 = (function () {
                function ProviderComponent8(heroService) {
                    // must be true else this component would have blown up at runtime
                    this.log = 'Hero service injected successfully';
                }
                ProviderComponent8 = __decorate([
                    core_1.Component({
                        selector: 'provider-8',
                        template: template,
                        providers: [hero_service_provider_1.heroServiceProvider, logger_service_1.Logger, user_service_1.UserService]
                    }), 
                    __metadata('design:paramtypes', [hero_service_1.HeroService])
                ], ProviderComponent8);
                return ProviderComponent8;
            }());
            exports_1("ProviderComponent8", ProviderComponent8);
            /////////////////
            ProviderComponent9a = (function () {
                /*
                // FAIL! Can't inject using the interface as the parameter type
                constructor(private _config: Config){ }
                */
                // @Inject(token) to inject the dependency
                function ProviderComponent9a(_config) {
                    this._config = _config;
                }
                ProviderComponent9a.prototype.ngOnInit = function () {
                    this.log = '"app.config" Application title is ' + this._config.title;
                };
                ProviderComponent9a = __decorate([
                    core_1.Component({
                        selector: 'provider-9a',
                        template: template,
                        providers: 
                        /*
                        // FAIL!  Can't use interface as provider token
                        [provide(Config, {useValue: CONFIG})]
                        */
                        // Use string as provider token
                        [core_1.provide('app.config', { useValue: app_config_1.CONFIG })]
                    }),
                    __param(0, core_1.Inject('app.config')), 
                    __metadata('design:paramtypes', [Object])
                ], ProviderComponent9a);
                return ProviderComponent9a;
            }());
            exports_1("ProviderComponent9a", ProviderComponent9a);
            ProviderComponent9b = (function () {
                function ProviderComponent9b(_config) {
                    this._config = _config;
                }
                ProviderComponent9b.prototype.ngOnInit = function () {
                    this.log = 'APP_CONFIG Application title is ' + this._config.title;
                };
                ProviderComponent9b = __decorate([
                    core_1.Component({
                        selector: 'provider-9b',
                        template: template,
                        providers: [core_1.provide(app_config_1.APP_CONFIG, { useValue: app_config_1.CONFIG })]
                    }),
                    __param(0, core_1.Inject(app_config_1.APP_CONFIG)), 
                    __metadata('design:paramtypes', [Object])
                ], ProviderComponent9b);
                return ProviderComponent9b;
            }());
            exports_1("ProviderComponent9b", ProviderComponent9b);
            //////////////////////////////////////////
            // Normal required logger
            ProviderComponent10a = (function () {
                function ProviderComponent10a(logger) {
                    logger.log('Hello from the required logger.');
                    this.log = logger.logs[0];
                }
                ProviderComponent10a = __decorate([
                    core_1.Component({
                        selector: 'provider-10a',
                        template: template,
                        providers: [logger_service_1.Logger]
                    }), 
                    __metadata('design:paramtypes', [logger_service_1.Logger])
                ], ProviderComponent10a);
                return ProviderComponent10a;
            }());
            exports_1("ProviderComponent10a", ProviderComponent10a);
            ProviderComponent10b = (function () {
                function ProviderComponent10b(_logger) {
                    this._logger = _logger;
                }
                ProviderComponent10b.prototype.ngOnInit = function () {
                    var _this = this;
                    // No logger? Make one!
                    if (!this._logger) {
                        this._logger = {
                            log: function (msg) { return _this._logger.logs.push(msg); },
                            logs: []
                        };
                        this._logger.log("Optional logger was not available.");
                    }
                    else {
                        this._logger.log('Hello from the injected logger.');
                        this.log = this._logger.logs[0];
                    }
                    this.log = this._logger.logs[0];
                };
                ProviderComponent10b = __decorate([
                    core_1.Component({
                        selector: 'provider-10b',
                        template: template
                    }),
                    __param(0, core_2.Optional()), 
                    __metadata('design:paramtypes', [logger_service_1.Logger])
                ], ProviderComponent10b);
                return ProviderComponent10b;
            }());
            exports_1("ProviderComponent10b", ProviderComponent10b);
            /////////////////
            ProvidersComponent = (function () {
                function ProvidersComponent() {
                }
                ProvidersComponent = __decorate([
                    core_1.Component({
                        selector: 'my-providers',
                        template: "\n  <h2>Provider variations</h2>\n  <div id=\"p1\"><provider-1></provider-1></div>\n  <div id=\"p2\"><provider-2></provider-2></div>\n  <div id=\"p3\"><provider-3></provider-3></div>\n  <div id=\"p4\"><provider-4></provider-4></div>\n  <div id=\"p5\"><provider-5></provider-5></div>\n  <div id=\"p6a\"><provider-6a></provider-6a></div>\n  <div id=\"p6b\"><provider-6b></provider-6b></div>\n  <div id=\"p7\"><provider-7></provider-7></div>\n  <div id=\"p8\"><provider-8></provider-8></div>\n  <div id=\"p9a\"><provider-9a></provider-9a></div>\n  <div id=\"p9b\"><provider-9b></provider-9b></div>\n  <div id=\"p10a\"><provider-10a></provider-10a></div>\n  <div id=\"p10b\"><provider-10b></provider-10b></div>\n  ",
                        directives: [
                            ProviderComponent1,
                            ProviderComponent2,
                            ProviderComponent3,
                            ProviderComponent4,
                            ProviderComponent5,
                            ProviderComponent6a,
                            ProviderComponent6b,
                            ProviderComponent7,
                            ProviderComponent8,
                            ProviderComponent9a,
                            ProviderComponent9b,
                            ProviderComponent10a,
                            ProviderComponent10b,
                        ],
                    }), 
                    __metadata('design:paramtypes', [])
                ], ProvidersComponent);
                return ProvidersComponent;
            }());
            exports_1("ProvidersComponent", ProvidersComponent);
        }
    }
});
//# sourceMappingURL=providers.components.js.map