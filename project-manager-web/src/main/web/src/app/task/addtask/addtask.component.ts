import {Component, OnInit} from '@angular/core';
import {User} from "../../model/user";
import {Project} from "../../model/project";
import {Task} from "../../model/task";
import {ParentTask} from "../../model/parenttask";
import {UserService} from "../../service/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {DatePipe} from "@angular/common";
import {ProjectService} from "../../service/project.service";
import {TaskService} from "../../service/task.service";
import {ParenttaskService} from "../../service/parenttask.service";

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css']
})
export class AddtaskComponent implements OnInit {

  users: User[];
  projects: Project[]
  parentTasks: ParentTask[];
  taskModel: Task = new Task();
  parentTask: ParentTask = new ParentTask();
  isParentTask: boolean = false;
  selectedProjectId: number;
  selectedParentTaskId: number;
  selectedUserId: number;
  projectErrorMessage: string;
  userErrorMessage: string;
  parentTaskErrorMessage: string;
  todayString: string;
  isEdit: boolean = false;
  tasks: Task[];


  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService, private projectService: ProjectService, private datePipe: DatePipe, private modalService: NgbModal, private taskService: TaskService, private parentTaskService: ParenttaskService) {
    this.todayString = this.datePipe.transform(new Date(), 'yyyy-MM-dd')
  }

  ngOnInit() {
    const taskId = this.route.snapshot.paramMap.get('id');
    if (!(taskId == null)) {
      this.isEdit = true;
      this.taskService.getAllTasks().subscribe(taskDtos => {
        this.taskModel = taskDtos.filter(taskDto => taskDto.taskId == taskId)[0];
        this.taskModel.startDateString =  this.datePipe.transform(this.taskModel.startDate, 'yyyy-MM-dd');
        this.taskModel.endDateString = this.datePipe.transform(this.taskModel.endDate, 'yyyy-MM-dd');
      });
    }
    this.projectService.getAllProjects().subscribe(projectDtos => {
      this.projects = projectDtos.filter(project => !this.isProjectSuspended(project));
    });
    this.userService.getAllUsers().subscribe(userDtos => {
      this.users = userDtos.filter(user => user.active);
    });
    this.parentTaskService.getAllParentTasks().subscribe(parentTaskDtos => {
      this.parentTasks = parentTaskDtos;
    });
    this.taskModel.startDateString = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.taskModel.endDateString = this.datePipe.transform(new Date(new Date().getTime() + 86400000), 'yyyy-MM-dd');

  }

  isProjectSuspended(project) {
    return new Date(project.endDate).toISOString().split('T')[0].localeCompare(new Date(new Date().getTime() + 330 * 60000).toISOString().split('T')[0]) <= 0;

  }

  cancelEdit() {
    this.router.navigate(['/viewtask'])
  }

  parentTaskControl(event) {
    this.isParentTask = !!event.target.checked;
    if (this.isParentTask) {
      this.projectErrorMessage = undefined;
      this.parentTaskErrorMessage = undefined;
      this.userErrorMessage = undefined;
      this.taskModel.projectId = undefined;
      this.taskModel.project = undefined;
      this.taskModel.userEmployeeId = undefined;
      this.taskModel.userName = undefined;
      this.taskModel.parentId = undefined;
      this.taskModel.parentTask = undefined;
      this.taskModel.startDateString = undefined;
      this.taskModel.endDateString = undefined;
    }
    else {
      this.taskModel.startDateString = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
      this.taskModel.endDateString = this.datePipe.transform(new Date(new Date().getTime() + 86400000), 'yyyy-MM-dd');

    }
  }

  onSubmit(taskData: Task) {
    this.taskModel = taskData;

    if (this.isParentTask) {
      this.parentTask.parentTask = this.taskModel.task;
      this.parentTaskService.addParentTask(this.parentTask)
        .subscribe(
          response => {
            this.router.navigate(['/addtask']);
          }
        );
    }
    else {
      if (!this.taskModel.userId || !this.taskModel.projectId || !this.taskModel.parentId) {
        if (!this.taskModel.userId) {
          this.userErrorMessage = "User is required";
        }
        if (!this.taskModel.projectId) {
          this.projectErrorMessage = "Project is required";
        }
        if (!this.taskModel.parentId) {
          this.parentTaskErrorMessage = "Parent Task is required";
        }
        return false;
      }
      const startDateParts = this.taskModel.startDateString.split('-');
      const endDateParts = this.taskModel.endDateString.split('-');

      this.taskModel.startDate = new Date(parseInt(startDateParts[0]), parseInt(startDateParts[1]) - 1, parseInt(startDateParts[2]));
      this.taskModel.endDate = new Date(parseInt(endDateParts[0]), parseInt(endDateParts[1]) - 1, parseInt(endDateParts[2]));
      this.taskModel.status = true;
      if (this.isEdit) {
        this.taskService.updateTask(this.taskModel)
          .subscribe(
            response => {
              this.router.navigate(['/viewtask']);
            }
          );
      } else {
        this.taskService.addTask(this.taskModel)
          .subscribe(
            response => {
              this.router.navigate(['/addtask']);
            }
          );
      }
    }
  }

  openUserSubModel(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    }, (reason) => {
      if (this.users.filter(user => user.userId == this.taskModel.userId).length === 0) {
        this.taskModel.userId = undefined;
        this.taskModel.userName = undefined;
        this.taskModel.userEmployeeId = undefined;
      }
    });
  }

  selectUser() {
    if (!this.selectedUserId) {
      if (this.users.filter(user => user.userId == this.taskModel.userId).length === 0) {
        this.taskModel.userId = undefined;
        this.taskModel.userName = undefined;
        this.taskModel.userEmployeeId = undefined;
      }
    } else {
      var user = this.users.filter(user => user.userId == this.selectedUserId)[0];
      this.taskModel.userEmployeeId = user.employeeId;
      this.taskModel.userId = user.userId;
      this.taskModel.userName = user.firstName + ',' + user.lastName;
      this.userErrorMessage = undefined;
    }
    this.modalService.dismissAll();
  }

  openParentTaskSubModel(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    }, (reason) => {
    });
  }

  selectParentTask() {
    if (this.selectedParentTaskId) {
      var parentTask = this.parentTasks.filter(parentTask => parentTask.parentId == this.selectedParentTaskId)[0];
      this.taskModel.parentId = parentTask.parentId;
      this.taskModel.parentTask = parentTask.parentTask;
      this.parentTaskErrorMessage = undefined;
    }
    this.modalService.dismissAll();
  }

  openProjectSubModel(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    }, (reason) => {
    });
  }

  selectProject() {
    if (this.selectedProjectId) {
      var project = this.projects.filter(project => project.projectId == this.selectedProjectId)[0];
      this.taskModel.projectId = project.projectId;
      this.taskModel.project = project.project;
      this.projectErrorMessage = undefined;
    }
    this.modalService.dismissAll();
  }
}
