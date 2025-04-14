import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { BancosComponent } from './pages/bancos/bancos.component';
import { RecuperarSenhaComponent } from './pages/recuperar-senha/recuperar-senha.component';
import { RecuperarSenhaFormComponent } from './pages/recuperar-senha-form/recuperar-senha-form.component';
import { BancoDetalhesComponent } from './pages/banco-detalhes/banco-detalhes.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },  
  { path: 'login', component: LoginComponent }, 
  { path: 'recuperar-senha', component: RecuperarSenhaComponent },
  { path: 'redefinir-senha/:token', component: RecuperarSenhaFormComponent},
  { path: 'home', component: HomeComponent, 
  children: [
    { path: 'bancos', component: BancosComponent},
    { path: 'detalhes-banco/:nomeBanco', component: BancoDetalhesComponent },
    { path: 'resultados', component: BancosComponent },
    { path: 'planos', component: BancosComponent },
    { path: '', redirectTo: 'bancos', pathMatch: 'full' }
  ] }, 
  { path: '**', redirectTo: 'login' } 
];
