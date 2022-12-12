import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AlertComponent } from './components/alert/alert.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {ErrorInterceptor, fakeBackendProvider, JwtInterceptor } from './helpers';
import { appRoutingModule } from './app.routing';
import { RulesAreasComponent } from './components/rules-areas/rules-areas.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { RulesVersionComponent } from './components/rules-version/rules-version.component';
import { QuestionComponent } from './components/question/question.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AlertComponent,
    HomeComponent,
    RegisterComponent,
    RulesAreasComponent,
    RulesVersionComponent,
    QuestionComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    appRoutingModule,
    BrowserAnimationsModule,
    MatTableModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { };
