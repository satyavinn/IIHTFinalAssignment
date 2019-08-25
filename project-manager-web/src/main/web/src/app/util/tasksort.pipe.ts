import {Pipe, PipeTransform} from '@angular/core';
import {Task} from '../model/task';

@Pipe({
  name: 'tasksort'
})
export class TasksortPipe implements PipeTransform {

  transform(tasks: Task[], taskSortColumn: string, sortIndicator: boolean): any {
    if (!tasks) {
      return tasks;
    }
    if (taskSortColumn === "startDate") {
      tasks.sort((p1, p2) => {
        return sortIndicator ? this.compareDate(p1.startDate, p2.startDate) : this.compareDate(p2.startDate, p1.startDate);
      });
    } else if (taskSortColumn === "endDate") {
      tasks.sort((p1, p2) => {
        return sortIndicator ? this.compareDate(p1.endDate, p2.endDate) : this.compareDate(p2.endDate, p1.endDate);
      });
    } else if (taskSortColumn === "priority") {
      tasks.sort((p1, p2) => {
        return sortIndicator ? p1.priority - p2.priority : p2.priority - p1.priority;
      });
    } else if (taskSortColumn === "completed") {
      tasks.sort((p1, p2) => {
        return sortIndicator ? (p1.status === p2.status) ? 0 : (p1.status ? -1 : 1) : (p2.status === p1.status) ? 0 : (p2.status ? -1 : 1);
      });
    }
    return tasks;
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
