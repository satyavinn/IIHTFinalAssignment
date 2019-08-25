import { Pipe, PipeTransform } from '@angular/core';
import {ParentTask} from "../model/parenttask";

@Pipe({
  name: 'parenttasksearch'
})
export class ParenttasksearchPipe implements PipeTransform {

  transform(parentTasks: ParentTask[], filter: number): ParentTask {
    return parentTasks.filter(parentTask => parentTask.parentId === filter)[0];
  }

}
