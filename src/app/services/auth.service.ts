import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { User } from '../models/user';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/throw'

export const MOCK_USER = new User();
MOCK_USER.id = "1";
MOCK_USER.email = "test@sapient.com";
MOCK_USER.firstName = "First N";
MOCK_USER.lastName = "Last N";
MOCK_USER.password = "password";

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {}

  getToken(): string {
    return localStorage.getItem('token');
  }

  logIn(email: string, password: string): Observable<any> {
    if (email === MOCK_USER.email && 
          password === MOCK_USER.password) {
      const token = Math.random().toString(36).substring(7)
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(MOCK_USER))
      MOCK_USER.token = token;
 
      return Observable.of(MOCK_USER);
    }

    return Observable.throw(new Error("Invalid email or password")); 
  }

  getUserName(){
    return this.isAuthenticated() ? 
            localStorage.getItem('userName') : ''
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token') 
                    && sessionStorage.getItem('token');
    return token != null;
  }
}
