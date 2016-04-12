import { Component, OnInit } from 'angular2/core';
import { Router } from 'angular2/router';

import { Hero } from '../Hero/hero';
import { HeroService } from '../Hero/hero.service';

@Component({
  selector: 'my-dashboardFullResponsiveTab',
  templateUrl: 'app/DashboardFullResponsiveTab/dashboardFullResponsiveTab.component.html',
  styleUrls: ['app/DashboardFullResponsiveTab/dashboardFullResponsiveTab.component.css']
})
export class DashboardFullResponsiveTabComponent implements OnInit {

  heroes: Hero[] = [];

  constructor(
    private _router: Router,
    private _heroService: HeroService) {
  }

  ngOnInit() {
    this._heroService.getHeroes()
      .then(heroes => this.heroes = heroes.slice(1,heroes.length));
  }

  gotoDetail(hero: Hero) {
    let link = ['HeroDetail', { id: hero.id }];
    this._router.navigate(link);
  }
}
