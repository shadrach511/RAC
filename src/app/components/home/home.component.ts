import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import {  AuthenticationService } from '../../services/authentication.service';
import { Observable } from 'rxjs';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
  currentUser: User;
  users: User[] = [];

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) {
    this.currentUser = this.authenticationService.getCurrentUserValue();


  }

  ngOnInit() {
   // this.loadAllUsers();
  }

  deleteUser(id: number) {
    this.userService.delete(id)
      .pipe(first())
      .subscribe(() => this.loadAllUsers());
  }

  private loadAllUsers() {
    this.userService.getAll()
      .pipe(first())
      .subscribe(users => this.users = users);
  }
}
