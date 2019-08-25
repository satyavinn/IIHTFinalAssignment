import {Pipe, PipeTransform} from '@angular/core';
import {User} from "../model/user";

@Pipe({
  name: 'usersort'
})
export class UsersortPipe implements PipeTransform {

  transform(users: User[], userSortColumn: string, sortIndicator: boolean): any {
    if (!users) {
      return users;
    }
    if (userSortColumn === "lastName") {
      users.sort((u1, u2) => {
        return sortIndicator ? u1.lastName.localeCompare(u2.lastName) : u2.lastName.localeCompare(u1.lastName);
      });
    } else if (userSortColumn === "firstName") {
      users.sort((u1, u2) => {
        return sortIndicator ? u1.firstName.localeCompare(u2.firstName) : u2.firstName.localeCompare(u1.firstName);
      });
    } else if (userSortColumn === "employeeId") {
      users.sort((u1, u2) => {
        return sortIndicator ? u1.employeeId - u2.employeeId : u2.employeeId - u1.employeeId;
      });
    }
    return users;
  }

}
