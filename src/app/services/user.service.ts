import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/user';
import { environment } from 'environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<User[]>(`${environment.apiUrl}/users`);
  }

  register(user: User) {
    //return this.http.post(`${environment.apiUrl}/users/register`, user);
    return this.http.post(`http://localhost:8080/api/auth/register`, user);
  }

  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}/users/${id}`);
  }
}
