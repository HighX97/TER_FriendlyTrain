System.register(['angular2/core', './car/car.component', './heroes/heroes.component', './app.config', './logger.service', './user.service', './injector.component', './test.component', './providers.component'], function(exports_1, context_1) {
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
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, car_component_1, heroes_component_1, app_config_1, logger_service_1, user_service_1, injector_component_1, test_component_1, providers_component_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (car_component_1_1) {
                car_component_1 = car_component_1_1;
            },
            function (heroes_component_1_1) {
                heroes_component_1 = heroes_component_1_1;
            },
            function (app_config_1_1) {
                app_config_1 = app_config_1_1;
            },
            function (logger_service_1_1) {
                logger_service_1 = logger_service_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            },
            function (injector_component_1_1) {
                injector_component_1 = injector_component_1_1;
            },
            function (test_component_1_1) {
                test_component_1 = test_component_1_1;
            },
            function (providers_component_1_1) {
                providers_component_1 = providers_component_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(config, _userService) {
                    this._userService = _userService;
                    this.title = config.title;
                }
                Object.defineProperty(AppComponent.prototype, "isAuthorized", {
                    get: function () { return this.user.isAuthorized; },
                    enumerable: true,
                    configurable: true
                });
                AppComponent.prototype.nextUser = function () { this._userService.getNewUser(); };
                Object.defineProperty(AppComponent.prototype, "user", {
                    get: function () { return this._userService.user; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AppComponent.prototype, "userInfo", {
                    get: function () {
                        return ("Current user, " + this.user.name + ", is ") +
                            ((this.isAuthorized ? '' : 'not') + " authorized. ");
                    },
                    enumerable: true,
                    configurable: true
                });
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        template: "\n    <h1>{{title}}</h1>\n    <my-car></my-car>\n    <my-injectors></my-injectors>\n    <my-tests></my-tests>\n    <h2>User</h2>\n    <p id=\"user\">\n      {{userInfo}}\n      <button (click)='nextUser()'>Next User</button>\n    <p>\n    <my-heroes id=\"authorized\" *ngIf=\"isAuthorized\"></my-heroes>\n    <my-heroes id=\"unauthorized\" *ngIf=\"!isAuthorized\"></my-heroes>\n  ",
                        directives: [car_component_1.CarComponent, heroes_component_1.HeroesComponent,
                            injector_component_1.InjectorComponent, test_component_1.TestComponent, providers_component_1.ProvidersComponent],
                        providers: [
                            logger_service_1.Logger,
                            user_service_1.UserService,
                            core_1.provide(app_config_1.APP_CONFIG, { useValue: app_config_1.CONFIG })
                        ]
                    }),
                    __param(0, core_1.Inject(app_config_1.APP_CONFIG)), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof app_config_1.Config !== 'undefined' && app_config_1.Config) === 'function' && _a) || Object, (typeof (_b = typeof user_service_1.UserService !== 'undefined' && user_service_1.UserService) === 'function' && _b) || Object])
                ], AppComponent);
                return AppComponent;
                var _a, _b;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map