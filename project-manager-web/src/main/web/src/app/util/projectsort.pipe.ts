import {Pipe, PipeTransform} from '@angular/core';
import {Project} from "../model/project";

@Pipe({
  name: 'projectsort'
})
export class ProjectsortPipe implements PipeTransform {

  transform(projects: Project[], projectSortColumn: string, sortIndicator: boolean): any {
    if (!projects) {
      return projects;
    }
    if (projectSortColumn === "startDate") {
      projects.sort((p1, p2) => {
        return sortIndicator ? this.compareDate(p1.startDate, p2.startDate) : this.compareDate(p2.startDate, p1.startDate);
      });
    } else if (projectSortColumn === "endDate") {
      projects.sort((p1, p2) => {
        return sortIndicator ? this.compareDate(p1.endDate, p2.endDate) : this.compareDate(p2.endDate, p1.endDate);
      });
    } else if (projectSortColumn === "priority") {
      projects.sort((p1, p2) => {
        return sortIndicator ? p1.priority - p2.priority : p2.priority - p1.priority;
      });
    } else if (projectSortColumn === "completed") {
      projects.sort((p1, p2) => {
        return sortIndicator ? p1.noOfCompletedTasks - p2.noOfCompletedTasks : p2.noOfCompletedTasks - p1.noOfCompletedTasks;
      });
    }
    return projects;
  }

  compareDate(d1, d2) {
    if (d1 > d2) {
      return 1;
    } else if (d1 < d2) {
      return -1;
    }
    return 0;


  }
}
