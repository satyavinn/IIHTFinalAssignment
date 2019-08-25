import {Pipe, PipeTransform} from '@angular/core';
import {Task} from '../model/task';

@Pipe({
  name: 'projecttasksearch'
})
export class ProjecttasksearchPipe implements PipeTransform {

  transform(tasks: Task[], filter: number): any {
    return !filter ? tasks : tasks.filter(task => task.projectId == filter);
  }

}
