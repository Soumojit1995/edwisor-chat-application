import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs/Observable';
import { Cookie} from 'ng2-cookies/ng2-cookies';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';
import { HttpClient, HttpHandler, HttpErrorResponse, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private url = 'https://chatapi.edwisor.com';
  private socket;
  constructor(public http: HttpClient) {
    this.socket = io(this.url);
   }
   // events to be listened
   public verifyUser = () => {
     return Observable.create((observer) => {
      this.socket.on('verifyUser', (data) => {
        observer.next(data);
      }); // end socket
     }); // end Observer
   } // end verifyUser


   public onlineUserList = () => {
    return Observable.create((observer) => {
      this.socket.on('online-user-list', (userList) => {
        observer.next(userList);
      }); // end socket
     }); // end Observer
   } // end onlineUserList


   public disconnectedSocket = () => {
    return Observable.create((observer) => {
      this.socket.on('disconnect', () => {
        observer.next();
      }); // end socket
     }); // end Observer
   } // end disconnectedSocket
   // end events to be listened
   // events to be emitted
   public setUser = (authToken) => {
     this.socket.emit('set-user', authToken);
   } // end setUser
 // events to be emitted
 public handleError(err: HttpErrorResponse) {
   let errorMessage = '';
   if (err.error instanceof Error) {
    errorMessage = `An error occurred: ${err.error.message}`;
   } else {
    errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;

   }
   console.error(errorMessage);
   return Observable.throw(errorMessage);
   }



}
