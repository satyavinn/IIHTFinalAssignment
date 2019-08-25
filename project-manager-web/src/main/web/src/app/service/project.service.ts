import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Project} from "../model/project";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private baseUrl = 'http://localhost:8091/projectmanager/api/v1/project';

  constructor(private http: HttpClient) {
  }

  addProject(project: Project): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, project);
  }

  getAllProjects(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}`);
  }

  updateProject(project: Project): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/`, project);
  }

  suspendProject(project: Project): Observable<any> {
    return this.http.put(`${this.baseUrl}/suspend`, project );
  }
}
