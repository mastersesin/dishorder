import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApicallService {
  constructor( private httpClient: HttpClient ) { }
  getCurrentWeather(): Observable<any> {
    return this.httpClient.get('http://127.0.0.1:5000/ldap')
  }
}
