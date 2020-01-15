import { Injectable } from '@angular/core';
import { map, pluck, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private httpClient: HttpClient) {}

  getStudents({ page, limit }): any {
    const params = new HttpParams()
    .set('page', page)
    .set('limit', limit);
    return this.httpClient.get(environment.apiUrl + '/api/v1/students/paginate', {params})
      .pipe(
        map(response => response),
      );
  }


  store(studentObj) {
    return this.httpClient.post<any>(environment.apiUrl + '/api/v1/students', studentObj)
      .pipe(
        map(response => response),
      );
  }

  update(studentObj) {
    return this.httpClient.put<any>(environment.apiUrl + '/api/v1/students', studentObj)
      .pipe(
        map(response => response),
      );
  }

  destroy(id: number) {
    return this.httpClient.delete<any>(environment.apiUrl + '/api/v1/students/'+ id)
      .pipe(
        map(response => response),
      );
  }
}
