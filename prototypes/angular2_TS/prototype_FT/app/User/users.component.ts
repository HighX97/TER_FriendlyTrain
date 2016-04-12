import { Component, OnInit } from 'angular2/core';
import { Router } from 'angular2/router';

import { User } from './user';
import { UserDetailComponent } from './user-detail.component';
import { UserService } from './user.service';

@Component({
  selector: 'my-users',
  templateUrl: 'app/User/users.component.html',
  styleUrls:  ['app/User/users.component.css'],
  directives: [UserDetailComponent]
})
export class UsersComponent implements OnInit {
  users: User[];
  selectedUser: User;

  constructor(
    private _router: Router,
    private _userService: UserService) { }

  getUsers() {
    this._userService.getUsers().then(users => this.users = users);
  }

  ngOnInit() {
    this.getUsers();
  }

  onSelect(user: User) { this.selectedUser = user; }

  gotoDetail() {
    this._router.navigate(['UserDetail', { id: this.selectedUser.id }]);
  }
}
