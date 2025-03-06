import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: '/(login:login)', pathMatch: 'full' },  
  { path: 'login', component: LoginComponent, outlet: 'login' }, 
  { path: '**', redirectTo: 'login' } 
];
