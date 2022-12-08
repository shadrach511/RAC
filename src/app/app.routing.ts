import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './helpers/auth.guard';
import { RulesAreasComponent } from './components/rules-areas/rules-areas.component';

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'rulesareas', component: RulesAreasComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);
