import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../services/authentication.service';
import { AlertService} from '../services/alert.service';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {

  loading = false;
  submitted = false;
  returnUrl: string | undefined;
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) {
  
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      domain: ['', Validators.required]});

    // redirect to home if already logged in
    if (this.authenticationService.getCurrentUserValue()) {
      this.router.navigate(['/']);
    }
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  ngOnInit() {

    };


  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    // @ts-ignore
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    // @ts-ignore
    this.authenticationService.login(this.loginForm.get('email').value, this.loginForm.get('password').value, this.loginForm.get('domain').value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
  // @ts-ignore
  public email() {
    // @ts-ignore
    return this.loginForm.get('email');
  }
  public password() {
    // @ts-ignore
    return this.loginForm.get('password');
  }
  public domain() {
    // @ts-ignore
    return this.loginForm.get('domain');
  }

}
