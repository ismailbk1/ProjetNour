import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from '../event';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private baseURL = 'http://localhost:8094/api/v1/events';

  constructor(private httpClient: HttpClient) {}

  getEventsList(): Observable<any> {
    return this.httpClient.get<Event[]>(`${this.baseURL}/all`);
  }
  getEventsListByClub(club:any): Observable<any> {
    return this.httpClient.post(`${this.baseURL}/event`,club);
  }

  creatEvent(event: Event): Observable<any> {
    return this.httpClient.post<any>(`${this.baseURL}/creatEvent`, event);
  }

  deleteEvent(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseURL}/delete/${id}`);
  }
  addEvent(data :any){
 
    return this.httpClient.post(`${this.baseURL}/add`,data,{ responseType: 'text' } )
  } 
  joinEvent(data :any){
 
    return this.httpClient.post(`${this.baseURL}/join`,data,{ responseType: 'text' } )
  } 
  updateEvent(data :any,id:any){
 
    return this.httpClient.post(`${this.baseURL}/updateEvent/${id}`,data,{ responseType: 'text' } )
  } 
}
