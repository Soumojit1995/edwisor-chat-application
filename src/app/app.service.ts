import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Cookie} from 'ng2-cookies/ng2-cookies';

import { HttpClient, HttpHandler, HttpErrorResponse, HttpParams} from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';
@Injectable({
  providedIn: 'root'
})
export class AppService {
 private url = 'https://chatapi.edwisor.com';

 constructor( public http: HttpClient) { } // constructor end

public getUserInfoFromLocalStorage = () => {

  return JSON.parse(localStorage.getItem('userInfo'));
}
public setUserInfoInLocalStorage = (data) => {
  localStorage.setItem('userInfo', JSON.stringify(data));
}


 // SingUp Function
 public signupFunction(data): Observable<any> {
   const params = new HttpParams()
   .set('firstName', data.firstName)
   .set('lastName', data.lastName)
   .set('mobileNumber', data.mobile)
   .set('email', data.email)
   .set( 'password', data.password)
   .set('apiKey', data.apiKey);
   return this.http.post(`${this.url}/api/v1/users/signup`, params);
 } // SingUp Function


   // SingIn Function
 public signinFunction(data): Observable<any> {
 const params = new HttpParams()
 .set('email', data.email)
 .set('password', data.password);
 return this.http.post(`${this.url}/api/v1/users/login`, params);
 }// end SignIn function
}
