System.register(['angular2/core', 'angular2/router', './user-detail.component', './user.service'], function(exports_1, context_1) {
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
    var core_1, router_1, user_detail_component_1, user_service_1;
    var UsersComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (user_detail_component_1_1) {
                user_detail_component_1 = user_detail_component_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            }],
        execute: function() {
            UsersComponent = (function () {
                function UsersComponent(_router, _userService) {
                    this._router = _router;
                    this._userService = _userService;
                }
                UsersComponent.prototype.getUsers = function () {
                    var _this = this;
                    this._userService.getUsers().then(function (users) { return _this.users = users; });
                };
                UsersComponent.prototype.ngOnInit = function () {
                    this.getUsers();
                };
                UsersComponent.prototype.onSelect = function (user) { this.selectedUser = user; };
                UsersComponent.prototype.gotoDetail = function () {
                    this._router.navigate(['UserDetail', { id: this.selectedUser.id }]);
                };
                UsersComponent = __decorate([
                    core_1.Component({
                        selector: 'my-users',
                        templateUrl: 'app/User/users.component.html',
                        styleUrls: ['app/User/users.component.css'],
                        directives: [user_detail_component_1.UserDetailComponent]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, user_service_1.UserService])
                ], UsersComponent);
                return UsersComponent;
            }());
            exports_1("UsersComponent", UsersComponent);
        }
    }
});
//# sourceMappingURL=users.component.js.map