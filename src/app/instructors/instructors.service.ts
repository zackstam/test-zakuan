import { Injectable } from '@angular/core';
import { map, pluck, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InstructorsService {

  constructor(private httpClient: HttpClient) {}

  getInstructors({ page, limit }): any {
    const params = new HttpParams()
    .set('page', page)
    .set('limit', limit);
    return this.httpClient.get(environment.apiUrl + '/api/v1/teachers/paginate', {params})
      .pipe(
        map(response => response),
      );
  }

  store(instructorObj) {
    return this.httpClient.post<any>(environment.apiUrl + '/api/v1/teachers', instructorObj)
      .pipe(
        map(response => response),
      );
  }

  update(instructorObj) {
    return this.httpClient.put<any>(environment.apiUrl + '/api/v1/teachers', instructorObj)
      .pipe(
        map(response => response),
      );
  }

  destroy(id: number) {
    return this.httpClient.delete<any>(environment.apiUrl + '/api/v1/teachers/'+ id)
      .pipe(
        map(response => response),
      );
  }

  all(): any {
    return this.httpClient.get(environment.apiUrl + '/api/v1/teachers')
      .pipe(
        map(response => response),
        pluck('data')
      );
  }
}
