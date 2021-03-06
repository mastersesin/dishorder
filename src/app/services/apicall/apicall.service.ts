import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ApicallService {
  constructor( private httpClient: HttpClient ) { }
  getCurrentWeather(): Observable<any> {
    return this.httpClient.get(environment.apiServer + '/products');
  }
  postLoginInfo(email, password): Observable<any> {
    var header = new HttpHeaders();
    header = header.append('Content-Type', 'application/json');
    return this.httpClient.post(environment.apiServer +'/login', {
      'email_address': email,
      'password': password});
  }
  postRegisterInfo(email_address, password, password_retype, first_name, family_name): Observable<any> {
    var header = new HttpHeaders();
    header = header.append('Content-Type', 'application/json');
    return this.httpClient.post(environment.apiServer +'/register', {
        'email_address': email_address,
        'password': password,
        'retype_password': password_retype,
        'first_name': first_name,
        'family_name': family_name,

      }
    );
  }
  getDishes(dish_name, supplier, tag_search): Observable<any> {
    if (supplier !== '' || tag_search !== '' || dish_name !== ''){
      var params = new HttpParams;
      if (supplier !== '' ) {
        params = params.append('supplier', supplier);
      }
      if (dish_name !== '' ) {
        params = params.append('dish_name', dish_name);
      }
      if (tag_search !== '' ) {
        params = params.append('tag_sort', tag_search);
      }
      return this.httpClient.get(environment.apiServer +'/get-dish', { params: params });
    } else {
      return this.httpClient.get(environment.apiServer +'/get-dish');
    }
  }
  postImage(files): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', files[0], files[0].name);
    return this.httpClient.post(environment.apiServer +'' + '/upload', formData);
  }

  postSupplierInfo(code, name, email_address, phone, contact_name, currency,min_quantity, min_amout, order_time_deadline, img_url): Observable<any> {
    var header = new HttpHeaders();
    header = header.append('Content-Type', 'application/json');
    return this.httpClient.post(environment.apiServer +'/create-supplier', {
        'code': code,
        'name': name,
        'email_address': email_address,
        'phone': phone,
        'contact_name': contact_name,
        'currency': currency,
        'uploaded_img_name': img_url,
        'order_time_deadline': order_time_deadline,
        'min_quantity': min_quantity,
        'min_amount': min_amout
      }
    );
  }

  putSupplierInfo(current_code, code, name, email_address, phone, contact_name, currency,min_quantity, min_amout, order_time_deadline, img_url): Observable<any> {
    var header = new HttpHeaders();
    header = header.append('Content-Type', 'application/json');
    return this.httpClient.put(environment.apiServer +'/edit-supplier', {
        'current_code': current_code,
        'code': code,
        'name': name,
        'email_address': email_address,
        'phone': phone,
        'contact_name': contact_name,
        'currency': currency,
        'uploaded_img_name': img_url,
        'order_time_deadline': order_time_deadline,
        'min_quantity': min_quantity,
        'min_amount': min_amout
      }
    );
  }

  getSuppliers(querystring_supplier): Observable<any> {
    if (querystring_supplier !== ''){
      var params = new HttpParams;
      params = params.append('querystring', querystring_supplier);
      return this.httpClient.get(environment.apiServer +'/suppliers', { params: params });
    } else {
      return this.httpClient.get(environment.apiServer +'/suppliers');
    }
  }

  postDishInfo(supplier, dish_name, dish_tag, dish_description, unit_price, currency, img_url): Observable<any> {
    var header = new HttpHeaders();
    header = header.append('Content-Type', 'application/json');
    return this.httpClient.post(environment.apiServer +'/create-dish', {
      'supplier': supplier,
      'dish_name': dish_name,
      'dish_tag': dish_tag,
      'dish_description': dish_description,
      'unit_price': unit_price,
      'currency': currency,
      'uploaded_img_name': img_url
    }
  );
  }

  putDishInfo(dish_id, supplier, dish_name, dish_tag, dish_description, unit_price, currency, img_url): Observable<any> {
    var header = new HttpHeaders();
    header = header.append('Content-Type', 'application/json');
    return this.httpClient.put(environment.apiServer + '/edit-dish', {
      'dish_id': dish_id,
      'supplier': supplier,
      'dish_name': dish_name,
      'dish_tag': dish_tag,
      'dish_description': dish_description,
      'unit_price': unit_price,
      'currency': currency,
      'uploaded_img_name': img_url
    }
  );
  }
  getTags(querystring): Observable<any> {
    if (querystring !== ''){
      var params = new HttpParams;
      params = params.append('querystring', querystring);
      return this.httpClient.get(environment.apiServer + '/get-tag', { params: params });
    } else {
      return this.httpClient.get(environment.apiServer + '/get-tag');
    }
  }

  getDishLay(supplier, tag_sort): Observable<any> {
    var params = new HttpParams;
    params = params.append('supplier', supplier);
    params = params.append('tag_sort', tag_sort);
    return this.httpClient.get(environment.apiServer + '/get-dish-lay', { params: params });
  }

  postOrderInfo(dishchoose): Observable<any> {
    var header = new HttpHeaders();
    header = header.append('Content-Type', 'application/json');
    return this.httpClient.post(environment.apiServer + '/foodorder', {
      'token': localStorage.getItem('token'),
      'dishchoose': dishchoose,
    });
  }

  getAllOrders(): Observable<any> {
    return this.httpClient.get(environment.apiServer + '/getallorders');
  }

  getAllUserOrders(supplier, order_month, order_day): Observable<any> {
    var params = new HttpParams;
    params = params.append('supplier', supplier);
    params = params.append('order_month', order_month);
    params = params.append('order_day', order_day);
    return this.httpClient.get(environment.apiServer + '/getalluserorders', { params: params });
  }

  deleteOrder(order_id): Observable<any> {
    return this.httpClient.delete(environment.apiServer + '/userorders/' + order_id, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }});
  }
}
