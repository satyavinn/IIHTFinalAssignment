import {Component, OnInit} from '@angular/core';
import {User} from '../model/user';
import {UserService} from "../service/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: User = new User();
  users: User[];
  allUsers: User[];
  opUser: User = new User();
  userSearchText: string;
  sortColumn: string = "employeeId";
  previousSortColumn: string = "OriginalOrder";
  sortIndicator: boolean = false;
  isEdit: boolean = false;
  errorMessage: string = "";

  constructor(private router: Router, private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getAllUsers().subscribe(userDtos => {
      this.allUsers = userDtos;
      this.users = this.allUsers.filter(user => user.active);
    });

  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    this.errorMessage = "";
    return !(charCode > 31 && (charCode < 48 || charCode > 57));


  }

  sortUsers(columnName) {
    if (columnName === this.previousSortColumn) {
      this.sortIndicator = !this.sortIndicator;
    } else {
      this.sortIndicator = true;
    }
    this.previousSortColumn = this.sortColumn;
    this.sortColumn = columnName;
  }

  onSubmit(userData: User) {
    this.user = userData;

    if(this.allUsers.filter(user => user.employeeId == this.user.employeeId && user.userId != this.user.userId).length > 0)
    {
      this.errorMessage = "Employee Id: "+this.user.employeeId+". Already Exists!!";
      return false;
    }
    if(this.isEdit)
    {
      this.userService.updateUser(this.user)
        .subscribe(
          response => {
            /*Reset User Model*/
            this.router.navigate(['/user']);
          }
        );
      this.isEdit = false;
    } else {
      this.user.active = true;
      this.userService.addUser(this.user)
        .subscribe(
          response => {
            this.router.navigate(['/user']);
          }
        );
    }
  }

  deleteUser(userData) {
    this.opUser = userData;
    this.opUser.active = false;
    this.userService.deleteUser(this.opUser)
      .subscribe(
        response => {
          /*Reset User Model*/
          this.router.navigate(['/user']);
        }
      );
  }

  editUserPopulate(userData) {
    this.user = Object.assign({}, userData);
    this.isEdit = true;
    window.scrollTo(0, 0);
  }

  cancelEdit()
  {
    this.isEdit = false;
    this.router.navigate(['/user']);
  }

}
