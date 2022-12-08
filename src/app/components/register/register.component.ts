import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService } from '../../services/alert.service';
import { UserService } from '../../services/user.service';
import { AuthenticationService } from '../../services/authentication.service';


@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.getCurrentUserValue()) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      domain: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // convenience getter for easy access to form fields
  // @ts-ignore
  public firstName() {
    // @ts-ignore
    return this.registerForm.get('firstName');
  }
  // @ts-ignore
  public lastName() {
    // @ts-ignore
    return this.registerForm.get('lastName');
  }
  // @ts-ignore
  public email() {
    // @ts-ignore
    return this.registerForm.get('email');
  }
  public password() {
    // @ts-ignore
    return this.registerForm.get('password');
  }
  public domain() {
    // @ts-ignore
    return this.registerForm.get('domain');
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService.register(this.registerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Registration successful', true);
          this.router.navigate(['/login']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
}
