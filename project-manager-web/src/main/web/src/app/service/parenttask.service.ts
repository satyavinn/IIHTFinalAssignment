import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ParentTask} from "../model/parenttask";

@Injectable({
  providedIn: 'root'
})
export class ParenttaskService {
  private baseUrl = 'http://localhost:8091/projectmanager/api/v1/parenttask';

  constructor(private http: HttpClient) {
  }

  addParentTask(parentTask: ParentTask): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, parentTask);
  }

  getAllParentTasks(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}`);
  }

}
