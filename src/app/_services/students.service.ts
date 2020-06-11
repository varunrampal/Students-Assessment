import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  baseUrl = environment.apiUrl + 'students';

  constructor(private http: HttpClient) {}

  getStudentsProfile(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
}
