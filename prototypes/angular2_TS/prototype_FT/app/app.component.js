System.register(['angular2/core', 'angular2/router', './Dashboard/dashboard.component', './User/user-detail.component', './Hero/hero.service', './Hero/heroes.component', './Hero/hero-detail.component'], function(exports_1, context_1) {
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
    var core_1, router_1, dashboard_component_1, user_detail_component_1, hero_service_1, heroes_component_1, hero_detail_component_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (dashboard_component_1_1) {
                dashboard_component_1 = dashboard_component_1_1;
            },
            function (user_detail_component_1_1) {
                user_detail_component_1 = user_detail_component_1_1;
            },
            function (hero_service_1_1) {
                hero_service_1 = hero_service_1_1;
            },
            function (heroes_component_1_1) {
                heroes_component_1 = heroes_component_1_1;
            },
            function (hero_detail_component_1_1) {
                hero_detail_component_1 = hero_detail_component_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.title = 'Tour of Heroes';
                }
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        template: 
                        //  /*
                        "\n  <body class=\"landing\">\n    <div id=\"page-wrapper\">\n\n      <!-- Header -->\n        <header id=\"header\" class=\"alt\">\n          <h1><a href=\"index.html\">Alpha</a> by HTML5 UP</h1>\n          <nav id=\"nav\">\n            <ul>\n              <li><a href=\"index.html\">Home</a></li>\n              <li>\n                <a href=\"#\" class=\"icon fa-angle-down\">Layouts</a>\n                <ul>\n                  <li><a href=\"generic.html\">Generic</a></li>\n                  <li><a href=\"contact.html\">Contact</a></li>\n                  <li><a href=\"elements.html\">Elements</a></li>\n                  <li>\n                    <a href=\"#\">Submenu</a>\n                    <ul>\n                      <li><a href=\"#\">Option One</a></li>\n                      <li><a href=\"#\">Option Two</a></li>\n                      <li><a href=\"#\">Option Three</a></li>\n                      <li><a href=\"#\">Option Four</a></li>\n                    </ul>\n                  </li>\n                </ul>\n              </li>\n              <li><a href=\"#\" class=\"button\">Sign Up</a></li>\n            </ul>\n          </nav>\n        </header>\n\n      <!-- Banner -->\n        <section id=\"banner\">\n          <h2>Alpha</h2>\n          <p>Another fine responsive site template freebie by HTML5 UP.</p>\n          <ul class=\"actions\">\n            <li><a href=\"#\" class=\"button special\">Sign Up</a></li>\n            <li><a href=\"#\" class=\"button\">Learn More</a></li>\n          </ul>\n        </section>\n\n      <!-- Main -->\n        <section id=\"main\" class=\"container\">\n\n          <section class=\"box special\">\n            <header class=\"major\">\n              <h2>Introducing the ultimate mobile app\n              <br />\n              for doing stuff with your phone</h2>\n              <p>Blandit varius ut praesent nascetur eu penatibus nisi risus faucibus nunc ornare<br />\n              adipiscing nunc adipiscing. Condimentum turpis massa.</p>\n            </header>\n            <span class=\"image featured\"><img src=\"app/html5up-alpha/images/pic01.jpg\" alt=\"\" /></span>\n          </section>\n\n          <section class=\"box special features\">\n            <div class=\"features-row\">\n              <section>\n                <span class=\"icon major fa-bolt accent2\"></span>\n                <h3>Magna etiam</h3>\n                <p>Integer volutpat ante et accumsan commophasellus sed aliquam feugiat lorem aliquet ut enim rutrum phasellus iaculis accumsan dolore magna aliquam veroeros.</p>\n              </section>\n              <section>\n                <span class=\"icon major fa-area-chart accent3\"></span>\n                <h3>Ipsum dolor</h3>\n                <p>Integer volutpat ante et accumsan commophasellus sed aliquam feugiat lorem aliquet ut enim rutrum phasellus iaculis accumsan dolore magna aliquam veroeros.</p>\n              </section>\n            </div>\n            <div class=\"features-row\">\n              <section>\n                <span class=\"icon major fa-cloud accent4\"></span>\n                <h3>Sed feugiat</h3>\n                <p>Integer volutpat ante et accumsan commophasellus sed aliquam feugiat lorem aliquet ut enim rutrum phasellus iaculis accumsan dolore magna aliquam veroeros.</p>\n              </section>\n              <section>\n                <span class=\"icon major fa-lock accent5\"></span>\n                <h3>Enim phasellus</h3>\n                <p>Integer volutpat ante et accumsan commophasellus sed aliquam feugiat lorem aliquet ut enim rutrum phasellus iaculis accumsan dolore magna aliquam veroeros.</p>\n              </section>\n            </div>\n          </section>\n\n          <div class=\"row\">\n            <div class=\"6u 12u(narrower)\">\n\n              <section class=\"box special\">\n                <span class=\"image featured\"><img src=\"app/html5up-alpha/images/pic02.jpg\" alt=\"\" /></span>\n                <h3>Sed lorem adipiscing</h3>\n                <p>Integer volutpat ante et accumsan commophasellus sed aliquam feugiat lorem aliquet ut enim rutrum phasellus iaculis accumsan dolore magna aliquam veroeros.</p>\n                <ul class=\"actions\">\n                  <li><a href=\"#\" class=\"button alt\">Learn More</a></li>\n                </ul>\n              </section>\n\n            </div>\n            <div class=\"6u 12u(narrower)\">\n\n              <section class=\"box special\">\n                <span class=\"image featured\"><img src=\"app/html5up-alpha/images/pic03.jpg\" alt=\"\" /></span>\n                <h3>Accumsan integer</h3>\n                <p>Integer volutpat ante et accumsan commophasellus sed aliquam feugiat lorem aliquet ut enim rutrum phasellus iaculis accumsan dolore magna aliquam veroeros.</p>\n                <ul class=\"actions\">\n                  <li><a href=\"#\" class=\"button alt\">Learn More</a></li>\n                </ul>\n              </section>\n\n            </div>\n          </div>\n\n        </section>\n\n      <!-- CTA -->\n        <section id=\"cta\">\n\n          <h2>Sign up for beta access</h2>\n          <p>Blandit varius ut praesent nascetur eu penatibus nisi risus faucibus nunc.</p>\n\n          <form>\n            <div class=\"row uniform 50%\">\n              <div class=\"8u 12u(mobilep)\">\n                <input type=\"email\" name=\"email\" id=\"email\" placeholder=\"Email Address\" />\n              </div>\n              <div class=\"4u 12u(mobilep)\">\n                <input type=\"submit\" value=\"Sign Up\" class=\"fit\" />\n              </div>\n            </div>\n          </form>\n\n        </section>\n\n      <!-- Footer -->\n        <footer id=\"footer\">\n          <ul class=\"icons\">\n            <li><a href=\"#\" class=\"icon fa-twitter\"><span class=\"label\">Twitter</span></a></li>\n            <li><a href=\"#\" class=\"icon fa-facebook\"><span class=\"label\">Facebook</span></a></li>\n            <li><a href=\"#\" class=\"icon fa-instagram\"><span class=\"label\">Instagram</span></a></li>\n            <li><a href=\"#\" class=\"icon fa-github\"><span class=\"label\">Github</span></a></li>\n            <li><a href=\"#\" class=\"icon fa-dribbble\"><span class=\"label\">Dribbble</span></a></li>\n            <li><a href=\"#\" class=\"icon fa-google-plus\"><span class=\"label\">Google+</span></a></li>\n          </ul>\n          <ul class=\"copyright\">\n            <li>&copy; Untitled. All rights reserved.</li><li>Design: <a href=\"http://html5up.net\">HTML5 UP</a></li>\n          </ul>\n        </footer>\n\n    </div>\n\n    <!-- Scripts -->\n      <script src=\"assets/js/jquery.min.js\"></script>\n      <script src=\"assets/js/jquery.dropotron.min.js\"></script>\n      <script src=\"assets/js/jquery.scrollgress.min.js\"></script>\n      <script src=\"assets/js/skel.min.js\"></script>\n      <script src=\"assets/js/util.js\"></script>\n      <!--[if lte IE 8]><script src=\"assets/js/ie/respond.min.js\"></script><![endif]-->\n      <script src=\"assets/js/main.js\"></script>\n\n  </body>\n    <h1>{{title}}</h1>\n    <nav>\n      <a [routerLink]=\"['Dashboard']\">Dashboard</a>\n      <a [routerLink]=\"['Heroes']\">Heroes</a>\n    </nav>\n    <router-outlet></router-outlet>\n  ",
                        //  */
                        /*
                        'app/html5up-alpha/index_template.html',
                        */
                        styleUrls: ['app/html5up-alpha/assets/css/main.css'],
                        directives: [router_1.ROUTER_DIRECTIVES],
                        providers: [
                            router_1.ROUTER_PROVIDERS,
                            hero_service_1.HeroService
                        ],
                    }),
                    router_1.RouteConfig([
                        {
                            path: '/dashboard',
                            name: 'Dashboard',
                            component: dashboard_component_1.DashboardComponent,
                            useAsDefault: true
                        },
                        {
                            path: '/detail/:id',
                            name: 'HeroDetail',
                            component: hero_detail_component_1.HeroDetailComponent
                        },
                        {
                            path: '/heroes',
                            name: 'Heroes',
                            component: heroes_component_1.HeroesComponent
                        },
                        {
                            path: '/detail-user/:id',
                            name: 'UserDetail',
                            component: user_detail_component_1.UserDetailComponent
                        },
                        {
                            path: '/users',
                            name: 'Users',
                            component: heroes_component_1.HeroesComponent
                        }
                    ]), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map