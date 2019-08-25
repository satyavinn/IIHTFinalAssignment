import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {TaskService} from "../../service/task.service";
import {ProjectService} from "../../service/project.service";
import {Project} from "../../model/project";
import {Task} from 'src/app/model/task';
import {ParentTask} from "../../model/parenttask";
import {ParenttaskService} from "../../service/parenttask.service";

@Component({
  selector: 'app-viewtask',
  templateUrl: './viewtask.component.html',
  styleUrls: ['./viewtask.component.css']
})
export class ViewtaskComponent implements OnInit {

  public tasks: Task[];
  public projects: Project[];
  public parentTasks: ParentTask[];
  public projectDisplayName: string;
  public selectedProjectId: number;
  public filterProjectTaskId: number;
  public taskDto : Task;
  sortColumn: string = "priority";
  previousSortColumn: string = "OriginalOrder";
  sortIndicator: boolean = false;


  constructor(private router: Router, private parentTaskService: ParenttaskService, private taskService: TaskService, private projectService: ProjectService, private modalService: NgbModal) {
  }

  ngOnInit() {
    this.projectService.getAllProjects().subscribe(projectDtos => {
      this.projects = projectDtos;
    });
    this.taskService.getAllTasks().subscribe(taskDtos => {
      this.tasks = taskDtos;
    });
    this.parentTaskService.getAllParentTasks().subscribe(parentTaskDto => {
      this.parentTasks = parentTaskDto;
    })
  }

  openProjectSubModel(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    }, (reason) => {
    });
  }

  selectProject() {
    if (this.selectedProjectId) {
      var project = this.projects.filter(project => project.projectId == this.selectedProjectId)[0];
      this.projectDisplayName = project.projectId+' - '+project.project;
      this.filterProjectTaskId = this.selectedProjectId;
    } else
    {
      this.projectDisplayName = undefined;
      this.selectedProjectId = undefined;
      this.filterProjectTaskId = undefined;
    }
    this.modalService.dismissAll();
  }

  sortTask(columnName) {
    if (columnName === this.previousSortColumn) {
      this.sortIndicator = !this.sortIndicator;
    } else {
      this.sortIndicator = true;
    }
    this.previousSortColumn = this.sortColumn;
    this.sortColumn = columnName;
  }


  endTask(task) {
    this.taskDto = task;
    this.taskDto.status = false;
    this.taskDto.endDate = new Date();
    this.taskService.endTask(this.taskDto)
      .subscribe(
        response => {
          this.router.navigate(['/viewtask']);
        });
  }

  updateTask(taskId) {
    this.router.navigate(['/updatetask',taskId])
  }



}
