import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { BancosComponent } from './pages/bancos/bancos.component';
import { RecuperarSenhaComponent } from './components/recuperar-senha/recuperar-senha.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },  
  { path: 'login', component: LoginComponent }, 
  {path: 'recuperar-senha', component: RecuperarSenhaComponent},
  { path: 'home', component: HomeComponent, 
  children: [
    { path: 'bancos', component: BancosComponent },
    { path: 'resultados', component: BancosComponent },
    { path: 'planos', component: BancosComponent },
    { path: '', redirectTo: 'bancos', pathMatch: 'full' }
  ] }, 
  { path: '**', redirectTo: 'login' } 
];
