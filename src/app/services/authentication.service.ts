import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {delay, map } from 'rxjs/operators';

import { User } from '../models/user';
import { LocalService } from './local.service';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient, private localService: LocalService) {

    // @ts-ignore
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public getCurrentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(email: any, password: any, domain: any) {
    return this.http.post<any>(`http://localhost:8080/api/auth/login`, { email, password, domain })
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        console.log('JSON.stringify(user) ' + JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    // @ts-ignore
    this.currentUserSubject.next(null);
  }
}
