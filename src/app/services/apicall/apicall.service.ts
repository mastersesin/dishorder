import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApicallService {
  constructor( private httpClient: HttpClient ) { }
  getCurrentWeather(): Observable<any> {
    return this.httpClient.get('http://172.16.46.157:3001/products');
  }
  postLoginInfo(email, password): Observable<any> {
    var header = new HttpHeaders();
    header = header.append('Content-Type', 'application/json');
    return this.httpClient.post('http://172.16.46.157:3001/login', {'email': email, 'password': password});
  }
  postRegisterInfo(email, password, finame, faname): Observable<any> {
    var header = new HttpHeaders();
    header = header.append('Content-Type', 'application/json');
    return this.httpClient.post('http://172.16.46.157:3001/register', {
        'email_address': email,
        'password': password,
        'first_name': finame,
        'family_name': faname
      }
    );
  }
  getDishes(querystring): Observable<any> {
    if (querystring !== ''){
      var params = new HttpParams;
      params = params.append('querystring', querystring);
      return this.httpClient.get('http://172.16.46.157:3001/dishes', { params: params });
    } else {
      return this.httpClient.get('http://172.16.46.157:3001/dishes');
    }
  }
  postImage(files): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', files[0], files[0].name);
    return this.httpClient.post('http://172.16.46.157:3001' + '/upload', formData);
  }

  postSupplierInfo(code, name, email_address, phone, contact_name, currency, img): Observable<any> {
    var header = new HttpHeaders();
    header = header.append('Content-Type', 'application/json');
    return this.httpClient.post('http://172.16.46.157:3001/create-supplier', {
        'code': code,
        'name': name,
        'email_address': email_address,
        'phone': phone,
        'contact_name': contact_name,
        'currency': currency,
        'uploaded_img_name': img
      }
    );
  }

  getSuppliers(querystring_supplier): Observable<any> {
    console.log(querystring_supplier);
    if (querystring_supplier !== ''){
      var params = new HttpParams;
      params = params.append('querystring', querystring_supplier);
      return this.httpClient.get('http://172.16.46.157:3001/suppliers', { params: params });
    } else {
      return this.httpClient.get('http://172.16.46.157:3001/suppliers');
    }
  }
}
