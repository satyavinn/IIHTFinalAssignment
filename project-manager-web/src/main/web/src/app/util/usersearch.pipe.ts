import {Pipe, PipeTransform} from '@angular/core';
import {User} from '../model/user';

@Pipe({
  name: 'usersearch'
})
export class UsersearchPipe implements PipeTransform {

  transform(users: User[], userSearchText: string): any {

    if (!users) {
      return users;
    }
    else {
      return users.filter(user => {
        return !userSearchText || user.employeeId.toString().indexOf(userSearchText.toLowerCase()) !== -1
          || user.firstName.toLowerCase().indexOf(userSearchText.toLowerCase()) !== -1
          || user.lastName.toLowerCase().indexOf(userSearchText.toLowerCase()) !== -1
      });
    }
  }

}
