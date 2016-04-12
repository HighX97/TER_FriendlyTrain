import { User } from './user';
import { USERS } from './mock-users';
import { Injectable } from 'angular2/core';

@Injectable()
export class UserService {
  getUsers() {
    return Promise.resolve(USERS);
  }

  // See the "Take it slow" appendix
  getUsersSlowly() {
    return new Promise<User[]>(resolve =>
      setTimeout(()=>resolve(USERS), 2000) // 2 seconds
    );
  }

  getUser(id: number) {
    return Promise.resolve(USERS).then(
      users => users.filter(user => user.id === id)[0]
    );
  }
}
