import { Injectable } from '@angular/core';
import { Subscriber, Observable, Subject } from 'rxjs';

@Injectable()
export class AuthService {
  constructor() {}

  login(userName:string, password:string): Observable<any> {
    const response = new Subject();

    // immitate back end call
    setTimeout(() => {
        if(userName == password) {
            const token = Math.random().toString(36).substring(7)
            localStorage.setItem('token', token);
            sessionStorage.setItem('token', token)
            localStorage.setItem('userName', userName)
            response.next(true);
        } else {
            response.next(false)
        }
    
    }, 3000)

    return response.asObservable();
  }

  getUserName(){
    return this.isAuthenticated() ? 
            localStorage.getItem('userName') : ''
  }

  logout(): Observable<any> {
    const response = new Subject();
    
    // immitate back end call
    setTimeout(() => {
        localStorage.removeItem('token');  
        sessionStorage.removeItem('token');  
        localStorage.removeItem('userName')
        response.next(true)  
    }, 3000)

    return response.asObservable();
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token') 
                    && sessionStorage.getItem('token');
    return token != null;
  }
}