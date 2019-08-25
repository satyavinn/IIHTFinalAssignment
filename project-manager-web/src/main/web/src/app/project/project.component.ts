import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ProjectService} from "../service/project.service";
import {Project} from "../model/project";
import {DatePipe} from "@angular/common";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {User} from "../model/user";
import {UserService} from "../service/user.service";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  selectedManagerId: number;
  projects: Project[];
  users: User[];
  projectModel: Project = new Project();
  opProject: Project = new Project();
  user: User;
  projectSearchText: string;
  sortColumn: string = "startDate";
  previousSortColumn: string = "OriginalOrder";
  sortIndicator: boolean = false;
  isEdit: boolean = false;
  isDateEnabled: boolean = true;
  todayString: string;
  errorMessage: string;

  constructor(private router: Router, private userService: UserService, private projectService: ProjectService, private datePipe: DatePipe, private modalService: NgbModal) {
    this.todayString = this.datePipe.transform(new Date(), 'yyyy-MM-dd')
  }

  ngOnInit() {
    this.projectService.getAllProjects().subscribe(projectDtos => {
      this.projects = projectDtos;
    });
    this.userService.getAllUsers().subscribe(userDtos => {
      this.users = userDtos.filter(user => user.active);
    });
    this.projectModel.startDateString = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.projectModel.endDateString = this.datePipe.transform(new Date(new Date().getTime() + 86400000), 'yyyy-MM-dd');
  }

  dateSetterControl(event) {
    this.isDateEnabled = !!event.target.checked;
  }

  sortProject(columnName) {
    if (columnName === this.previousSortColumn) {
      this.sortIndicator = !this.sortIndicator;
    } else {
      this.sortIndicator = true;
    }
    this.previousSortColumn = this.sortColumn;
    this.sortColumn = columnName;
  }

  onSubmit(projectData: Project) {
    this.projectModel = projectData;

    if (!this.projectModel.managerId) {
      this.errorMessage = "Manager is required";
      return false;
    }
    const startDateParts = this.projectModel.startDateString.split('-');
    const endDateParts = this.projectModel.endDateString.split('-');

    this.projectModel.startDate = new Date(parseInt(startDateParts[0]), parseInt(startDateParts[1]) - 1, parseInt(startDateParts[2]));
    this.projectModel.endDate = new Date(parseInt(endDateParts[0]), parseInt(endDateParts[1]) - 1, parseInt(endDateParts[2]));

    if (this.isEdit) {
      this.projectService.updateProject(this.projectModel)
        .subscribe(
          response => {
            this.router.navigate(['/project']);
          }
        );
      this.isEdit = false;
    } else {
      this.projectService.addProject(this.projectModel)
        .subscribe(
          response => {
            this.router.navigate(['/project']);
          }
        );
    }
  }

  suspendProject(projectData) {
    this.opProject = projectData;
    this.opProject.endDate = new Date();
    this.projectService.suspendProject(this.opProject)
      .subscribe(
        response => {
          this.router.navigate(['/project']);
        }
      );
  }

  editProjectPopulate(projectData) {
    this.projectModel = Object.assign({}, projectData);
    this.isEdit = true;
    this.projectModel.startDateString = this.datePipe.transform(this.projectModel.startDate, 'yyyy-MM-dd');
    this.projectModel.endDateString = this.datePipe.transform(this.projectModel.endDate, 'yyyy-MM-dd');
    window.scrollTo(0, 0);
  }

  cancelEdit() {
    this.isEdit = false;
    this.router.navigate(['/project']);
  }

  projectSuspended(formProject) {
    this.opProject = formProject;
    return new Date(this.opProject.endDate).toISOString().split('T')[0].localeCompare(new Date(new Date().getTime() + 330 * 60000).toISOString().split('T')[0]) <= 0;

  }

  openSubModel(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    }, (reason) => {
      if (this.users.filter(user => user.userId == this.projectModel.managerId).length === 0) {
        this.projectModel.managerId = undefined;
        this.projectModel.managerName = undefined;
        this.projectModel.managerEmployeeId = undefined;
      }
    });
  }

  selectManager() {
    if (!this.selectedManagerId) {
      if (this.users.filter(user => user.userId == this.projectModel.managerId).length === 0) {
        this.projectModel.managerId = undefined;
        this.projectModel.managerName = undefined;
        this.projectModel.managerEmployeeId = undefined;
      }
    } else {
      this.user = this.users.filter(user => user.userId == this.selectedManagerId)[0];
      this.projectModel.managerEmployeeId = this.user.employeeId;
      this.projectModel.managerId = this.user.userId;
      this.projectModel.managerName = this.user.firstName + ',' + this.user.lastName;
      this.errorMessage = undefined;
    }
    this.modalService.dismissAll();
  }

}
