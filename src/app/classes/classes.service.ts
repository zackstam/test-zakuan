import { Injectable } from '@angular/core';
import { map, pluck, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClassesService {

  constructor(private httpClient: HttpClient) {}

  getClasses({ page, limit }): any {
    const params = new HttpParams()
    .set('page', page)
    .set('limit', limit);
    return this.httpClient.get(environment.apiUrl + '/api/v1/subjects/paginate', {params})
      .pipe(
        map(response => response),
      );
  }

  all(): any {
    return this.httpClient.get(environment.apiUrl + '/api/v1/subjects')
      .pipe(
        map(response => response),
      );
  }

  store(classObj: any) {
    return this.httpClient.post<any>(environment.apiUrl + '/api/v1/subjects', classObj)
      .pipe(
        map(response => response),
      );
  }

  update(classObj) {
    return this.httpClient.put<any>(environment.apiUrl + '/api/v1/subjects', classObj)
      .pipe(
        map(response => response),
      );
  }

  destroy(id: number) {
    return this.httpClient.delete<any>(environment.apiUrl + '/api/v1/subjects/'+ id)
      .pipe(
        map(response => response),
      );
  }
}
