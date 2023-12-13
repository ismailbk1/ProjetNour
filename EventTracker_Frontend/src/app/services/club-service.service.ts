import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClubServiceService {
  private baseURL = 'http://localhost:8094/club';
  jsonHeader = {
    headers: new HttpHeaders().set('Content-Type', 'application/json'),
  };
  constructor(private http: HttpClient) { }


  registerClub(clubData: any): Observable<any> {
    const url = `${this.baseURL}/register`;
    return this.http.post(url, clubData);
  }
  loginClub(clubname: string, password: string): Observable<any> {
    const credentials = { clubname, password };
    return this.http.post(`${this.baseURL}/login`, credentials,this.jsonHeader);
  }
}
