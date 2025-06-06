import { Routes } from '@angular/router';
import { BancoDetalhesComponent } from './pages/banco-detalhes/banco-detalhes.component';
import { BancosComponent } from './pages/bancos/bancos.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RecuperarSenhaFormComponent } from './pages/recuperar-senha-form/recuperar-senha-form.component';
import { RecuperarSenhaComponent } from './pages/recuperar-senha/recuperar-senha.component';
import { UserManagementComponent } from './pages/user-management/user-management.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'recuperar-senha', component: RecuperarSenhaComponent },
  { path: 'redefinir-senha/:token', component: RecuperarSenhaFormComponent },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: 'bancos', component: BancosComponent },
      { path: 'detalhes-banco/:nomeBanco', component: BancoDetalhesComponent },
      { path: 'usuarios', component: UserManagementComponent },
      { path: '', redirectTo: 'bancos', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: 'login' },
];
