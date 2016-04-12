System.register(['angular2/core', 'angular2/router', './hero.service', './dashboard.component', './heroes.component', './hero-detail.component'], function(exports_1, context_1) {
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
    var core_1, router_1, hero_service_1, dashboard_component_1, heroes_component_1, hero_detail_component_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (hero_service_1_1) {
                hero_service_1 = hero_service_1_1;
            },
            function (dashboard_component_1_1) {
                dashboard_component_1 = dashboard_component_1_1;
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
                        template: "\n    <h1>{{title}}</h1>\n    <nav>\n      <a [routerLink]=\"['Dashboard']\">Dashboard</a>\n      <a [routerLink]=\"['Heroes']\">Heroes</a>\n    </nav>\n    <router-outlet></router-outlet>\n  ",
                        styleUrls: ['app/app.component.css'],
                        directives: [router_1.ROUTER_DIRECTIVES],
                        providers: [
                            router_1.ROUTER_PROVIDERS,
                            hero_service_1.HeroService
                        ]
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
//import {Component} from 'angular2/core';
//00_Init
/*
@Component({
selector: 'my-app',
template: '<h1>My First Angular 2 App Tour of heroes</h1>'
})
export class AppComponent { }
*/
//https://angular.io/docs/ts/latest/tutorial/toh-pt1.html
//01_Show our Hero
/*
@Component({
selector: 'my-app',
template: '<h1>{{title}}</h1><h2>{{hero}} details!</h2>'
})
export class AppComponent {
public title = 'Tour of Heroes';
public hero = 'Windstorm';
}
*/
//02_Hero object
/*
interface Hero {
id: number;
name: string;
}

@Component({
selector: 'my-app',
template: '<h1>{{title}}</h1><h2>{{hero.name}} details!</h2>'
})
export class AppComponent {
public title = 'Tour of Heroes';
public hero: Hero = {
id: 1,
name: 'Windstorm'
};
}
*/
//03_Adding more HTML
/*
interface Hero {
id: number;
name: string;
}

@Component({
selector: 'my-app',
template: '<h1>{{title}}</h1><h2>{{hero.name}} details!</h2><div><label>id: </label>{{hero.id}}</div><div><label>name: </label>{{hero.name}}</div>'
})
export class AppComponent {
public title = 'Tour of Heroes';
public hero: Hero = {
id: 1,
name: 'Windstorm'
};
}
*/
//04_Multi-line template strings
/*
interface Hero {
id: number;
name: string;
}

@Component({
selector: 'my-app',
template:`
<h1>{{title}}</h1>
<h2>{{hero.name}} details!</h2>
<div><label>id: </label>{{hero.id}}</div>
<div><label>name: </label>{{hero.name}}</div>
`
})
export class AppComponent {
public title = 'Tour of Heroes';
public hero: Hero = {
id: 1,
name: 'Windstorm'
};
}
*/
//05_Editing Our Hero
/*
interface Hero {
id: number;
name: string;
}

@Component({
selector: 'my-app',
template:`
<h1>{{title}}</h1>
<h2>{{hero.name}} details!</h2>
<div><label>id: </label>{{hero.id}}</div>
<div>
<label>name: </label>
<div><input value="{{hero.name}}" placeholder="name"></div>
</div>
`
})
//Two-Way Binding
//We intend to display the name of the hero in the <input>, change it, and see those changes wherever we bind to the hero’s name.
//In short, we want two-way data binding.
//Let’s update the template to use the ngModel built-in directive for two-way binding.
//Replace the <input> with the following HTML
//<input [(ngModel)]="hero.name" placeholder="name">

export class AppComponent {
public title = 'Tour of Heroes';
public hero: Hero = {
id: 1,
name: 'Windstorm'
};
}
*/
//https://angular.io/docs/ts/latest/tutorial/toh-pt2.html
//11_Displaying Our Heroes
/*
interface Hero {
id: number;
name: string;
}
@Component({
selector: 'my-app',
//Displaying heroes in a template
//Listing heroes with ngFor
template:`
<h1>{{title}}</h1>
<h2>My Heroes</h2>
<ul class="heroes">
<li *ngFor="#hero of heroes">
<span class="badge">{{hero.id}}</span> {{hero.name}}
</li>
</ul>
`
})
export class AppComponent {
public title = 'Tour of Heroes';
//Exposing heroes
public heroes = HEROES;
}
//Creating heroes
var HEROES: Hero[] = [
{ "id": 11, "name": "Mr. Nice" },
{ "id": 12, "name": "Narco" },
{ "id": 13, "name": "Bombasto" },
{ "id": 14, "name": "Celeritas" },
{ "id": 15, "name": "Magneta" },
{ "id": 16, "name": "RubberMan" },
{ "id": 17, "name": "Dynama" },
{ "id": 18, "name": "Dr IQ" },
{ "id": 19, "name": "Magma" },
{ "id": 20, "name": "Tornado" }
];
*/
//12_Styling our heroes
/*
interface Hero {
id: number;
name: string;
}
@Component({
selector: 'my-app',
//Displaying heroes in a template
//Listing heroes with ngFor
template:`
<h1>{{title}}</h1>
<h2>My Heroes</h2>
<ul class="heroes">
<li *ngFor="#hero of heroes">
<span class="badge">{{hero.id}}</span> {{hero.name}}
</li>
</ul>
`,
styles:[`
.selected {
background-color: #CFD8DC !important;
color: white;
}
.heroes {
margin: 0 0 2em 0;
list-style-type: none;
padding: 0;
width: 10em;
}
.heroes li {
cursor: pointer;
position: relative;
left: 0;
background-color: #EEE;
margin: .5em;
padding: .3em 0;
height: 1.6em;
border-radius: 4px;
}
.heroes li.selected:hover {
background-color: #BBD8DC !important;
color: white;
}
.heroes li:hover {
color: #607D8B;
background-color: #DDD;
left: .1em;
}
.heroes .text {
position: relative;
top: -3px;
}
.heroes .badge {
display: inline-block;
font-size: small;
color: white;
padding: 0.8em 0.7em 0 0.7em;
background-color: #607D8B;
line-height: 1em;
position: relative;
left: -1px;
top: -4px;
height: 1.8em;
margin-right: .8em;
border-radius: 4px 0 0 4px;
}
`]
})
export class AppComponent {
public title = 'Tour of Heroes';
//Exposing heroes
public heroes = HEROES;
}
//Creating heroes
var HEROES: Hero[] = [
{ "id": 11, "name": "Mr. Nice" },
{ "id": 12, "name": "Narco" },
{ "id": 13, "name": "Bombasto" },
{ "id": 14, "name": "Celeritas" },
{ "id": 15, "name": "Magneta" },
{ "id": 16, "name": "RubberMan" },
{ "id": 17, "name": "Dynama" },
{ "id": 18, "name": "Dr IQ" },
{ "id": 19, "name": "Magma" },
{ "id": 20, "name": "Tornado" }
];
*/
//13_Selecting a Hero
/*
interface Hero {
id: number;
name: string;
}
@Component({
selector: 'my-app',
//Click event
//We modify the <li> by inserting an Angular event binding to its click event.
//The parenthesis identify the <li> element’s click event as the target.
//The expression to the right of the equal sign calls the AppComponent method, onSelect(), passing the local template variable hero as an argument.
//That’s the same hero variable we defined previously in the ngFor.
//Remember that the leading asterisk (*) in front of ngIf is a critical part of this syntax.
template:`
<h1>{{title}}</h1>
<h2>My Heroes</h2>
<ul class="heroes">
<li *ngFor="#hero of heroes"
[class.selected]="hero === selectedHero"
(click)="onSelect(hero)">
<span class="badge">{{hero.id}}</span> {{hero.name}}
</li>
</ul>
<div *ngIf="selectedHero">
<h2>{{selectedHero.name}} details!</h2>
<div><label>id: </label>{{selectedHero.id}}</div>
<div>
<label>name: </label>
<input [(ngModel)]="selectedHero.name" placeholder="name"/>
</div>
</div>
`,
styles:[`
.selected {
background-color: #CFD8DC !important;
color: white;
}
.heroes {
margin: 0 0 2em 0;
list-style-type: none;
padding: 0;
width: 10em;
}
.heroes li {
cursor: pointer;
position: relative;
left: 0;
background-color: #EEE;
margin: .5em;
padding: .3em 0;
height: 1.6em;
border-radius: 4px;
}
.heroes li.selected:hover {
background-color: #BBD8DC !important;
color: white;
}
.heroes li:hover {
color: #607D8B;
background-color: #DDD;
left: .1em;
}
.heroes .text {
position: relative;
top: -3px;
}
.heroes .badge {
display: inline-block;
font-size: small;
color: white;
padding: 0.8em 0.7em 0 0.7em;
background-color: #607D8B;
line-height: 1em;
position: relative;
left: -1px;
top: -4px;
height: 1.8em;
margin-right: .8em;
border-radius: 4px 0 0 4px;
}
`]
})
export class AppComponent {
title = 'Tour of Heroes';
heroes = HEROES;
selectedHero: Hero;
//Add the click handler
//Our event binding refers to an onSelect method that doesn’t exist yet. We’ll add that method to our component now.
//What should that method do? It should set the component’s selected hero to the hero that the user clicked.
//Our component doesn’t have a “selected hero” yet either. We’ll start there.
//Expose the selected hero
//We no longer need the static hero property of the AppComponent. Replace it with this simple selectedHero property:
//We’ve decided that none of the heroes should be selected before the user picks a hero so we won’t initialize the selectedHero as we were doing with hero.
//Now add an onSelect method that sets the selectedHero property to the hero the user clicked.
onSelect(hero: Hero) { this.selectedHero = hero; }
}
var HEROES: Hero[] = [
{ "id": 11, "name": "Mr. Nice" },
{ "id": 12, "name": "Narco" },
{ "id": 13, "name": "Bombasto" },
{ "id": 14, "name": "Celeritas" },
{ "id": 15, "name": "Magneta" },
{ "id": 16, "name": "RubberMan" },
{ "id": 17, "name": "Dynama" },
{ "id": 18, "name": "Dr IQ" },
{ "id": 19, "name": "Magma" },
{ "id": 20, "name": "Tornado" }
];
*/
/*
import {Hero} from './hero';
import {HeroDetailComponent} from './hero-detail.component';
@Component({
  selector: 'my-app',
  template:`
    <h1>{{title}}</h1>
    <h2>My Heroes</h2>
    <ul class="heroes">
      <li *ngFor="#hero of heroes"
        [class.selected]="hero === selectedHero"
        (click)="onSelect(hero)">
        <span class="badge">{{hero.id}}</span> {{hero.name}}
      </li>
    </ul>
    <my-hero-detail [hero]="selectedHero"></my-hero-detail>
  `,
  styles:[`
    .selected {
      background-color: #CFD8DC !important;
      color: white;
    }
    .heroes {
      margin: 0 0 2em 0;
      list-style-type: none;
      padding: 0;
      width: 10em;
    }
    .heroes li {
      cursor: pointer;
      position: relative;
      left: 0;
      background-color: #EEE;
      margin: .5em;
      padding: .3em 0;
      height: 1.6em;
      border-radius: 4px;
    }
    .heroes li.selected:hover {
      background-color: #BBD8DC !important;
      color: white;
    }
    .heroes li:hover {
      color: #607D8B;
      background-color: #DDD;
      left: .1em;
    }
    .heroes .text {
      position: relative;
      top: -3px;
    }
    .heroes .badge {
      display: inline-block;
      font-size: small;
      color: white;
      padding: 0.8em 0.7em 0 0.7em;
      background-color: #607D8B;
      line-height: 1em;
      position: relative;
      left: -1px;
      top: -4px;
      height: 1.8em;
      margin-right: .8em;
      border-radius: 4px 0 0 4px;
    }
  `],
  directives: [HeroDetailComponent]
})
export class AppComponent {
  title = 'Tour of Heroes';
  heroes = HEROES;
  selectedHero: Hero;
  onSelect(hero: Hero) { this.selectedHero = hero; }
}
var HEROES: Hero[] = [
  { "id": 11, "name": "Mr. Nice" },
  { "id": 12, "name": "Narco" },
  { "id": 13, "name": "Bombasto" },
  { "id": 14, "name": "Celeritas" },
  { "id": 15, "name": "Magneta" },
  { "id": 16, "name": "RubberMan" },
  { "id": 17, "name": "Dynama" },
  { "id": 18, "name": "Dr IQ" },
  { "id": 19, "name": "Magma" },
  { "id": 20, "name": "Tornado" }
];
*/
/*
import {Hero} from './hero';
import {HeroDetailComponent} from './hero-detail.component';
import {HeroService} from './hero.service';
@Component({
  selector: 'my-app',
  template:`
    <h1>{{title}}</h1>
    <h2>My Heroes</h2>
    <ul class="heroes">
      <li *ngFor="#hero of heroes"
        [class.selected]="hero === selectedHero"
        (click)="onSelect(hero)">
        <span class="badge">{{hero.id}}</span> {{hero.name}}
      </li>
    </ul>
    <my-hero-detail [hero]="selectedHero"></my-hero-detail>
  `,
  styles:[`
    .selected {
      background-color: #CFD8DC !important;
      color: white;
    }
    .heroes {
      margin: 0 0 2em 0;
      list-style-type: none;
      padding: 0;
      width: 10em;
    }
    .heroes li {
      cursor: pointer;
      position: relative;
      left: 0;
      background-color: #EEE;
      margin: .5em;
      padding: .3em 0;
      height: 1.6em;
      border-radius: 4px;
    }
    .heroes li.selected:hover {
      background-color: #BBD8DC !important;
      color: white;
    }
    .heroes li:hover {
      color: #607D8B;
      background-color: #DDD;
      left: .1em;
    }
    .heroes .text {
      position: relative;
      top: -3px;
    }
    .heroes .badge {
      display: inline-block;
      font-size: small;
      color: white;
      padding: 0.8em 0.7em 0 0.7em;
      background-color: #607D8B;
      line-height: 1em;
      position: relative;
      left: -1px;
      top: -4px;
      height: 1.8em;
      margin-right: .8em;
      border-radius: 4px 0 0 4px;
    }
  `],
  directives: [HeroDetailComponent],
  providers: [HeroService]
})

export class AppComponent {
  title = 'Tour of Heroes';
  heroes: Hero[];
  selectedHero: Hero;
  constructor(private _heroService: HeroService) { }
  getHeroes() {
    this._heroService.getHeroes().then(heroes => this.heroes = heroes);
  }
  ngOnInit() {
    this.getHeroes();
  }
  onSelect(hero: Hero) { this.selectedHero = hero; }
}
*/
//# sourceMappingURL=app.component.js.map