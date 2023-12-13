import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private baseURL = 'http://localhost:8094/student';
  jsonHeader = {
    headers: new HttpHeaders().set('Content-Type', 'application/json'),
  };
  constructor(private http: HttpClient) { }


  registerStudent(studentData: any): Observable<any> {
    const url = `${this.baseURL}/register`;
    return this.http.post(url, studentData);
  }
  loginUser(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseURL}/login`, { email, password },this.jsonHeader);
  }
}
