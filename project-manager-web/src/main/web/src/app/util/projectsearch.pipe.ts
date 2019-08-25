import {Pipe, PipeTransform} from '@angular/core';
import {Project} from "../model/project";

@Pipe({
  name: 'projectsearch'
})
export class ProjectsearchPipe implements PipeTransform {

  transform(projects: Project[], projectSearchText: string): any {

    if (!projects) {
      return projects;
    }
    else {
      return projects.filter(project => {
        return !projectSearchText || project.project.toString().indexOf(projectSearchText.toLowerCase()) !== -1
      });
    }
  }

}
