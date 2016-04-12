import { Component, OnInit } from 'angular2/core';
import {RouteParams} from 'angular2/router';

import { User } from './user';
import { UserService } from './user.service';

@Component({
  selector: 'my-user-detail',
  templateUrl: 'app/User/user-detail.component.html',
  styleUrls: ['app/User/user-detail.component.css'],
  inputs: ['user']
})
export class UserDetailComponent implements OnInit {
  user: User;

  constructor(
    private _userService: UserService,
    private _routeParams: RouteParams) {
  }

  ngOnInit() {
    let id = +this._routeParams.get('id');
    this._userService.getUser(id)
      .then(user => this.user = user);
  }

  goBack() {
    window.history.back();
  }
}
