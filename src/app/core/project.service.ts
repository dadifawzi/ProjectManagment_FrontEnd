import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private http: HttpClient) {}

  private apiUrl = 'http://localhost:3000';

  getprojects() {
    return this.http.get(this.apiUrl + '/project/');
  }

  getprojectById(id: any) {
    return this.http.get(this.apiUrl + '/project/' + id);
  }

  createproject(project: any) {
    return this.http.post(this.apiUrl + '/project/', project);
  }

  updateproject(project: any, id: any) {
    return this.http.put(this.apiUrl + '/project/' + id, project);
  }

  deleteproject(id: any) {
    return this.http.delete(this.apiUrl + '/project/' + id);
  }
}
