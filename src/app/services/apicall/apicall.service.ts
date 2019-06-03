import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApicallService {
  constructor( private httpClient: HttpClient ) { }
  getCurrentWeather(): Observable<any> {
    return this.httpClient.get('http://127.0.0.1:3000/ldap');
  }
  getSuppliers(): Observable<any> {
    return this.httpClient.get('http://127.0.0.1:3000/suppliers');
  }
  postLoginInfo(email, password): Observable<any> {
    var header = new HttpHeaders();
    header = header.append('Content-Type', 'application/json');
    return this.httpClient.post('http://127.0.0.1:3000/login', {'email': email, 'password': password});
  }
  getDishes(querystring): Observable<any> {
    if (querystring !== ''){
      var params = new HttpParams;
      params = params.append('querystring', querystring);
      return this.httpClient.get('http://127.0.0.1:3000/dishes', { params: params });
    } else {
      return this.httpClient.get('http://127.0.0.1:3000/dishes');
    }
  }
}
