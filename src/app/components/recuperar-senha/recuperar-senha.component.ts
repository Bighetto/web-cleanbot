import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-recuperar-senha',
  standalone: true,
  imports:[
  MatFormFieldModule,
    MatCardModule,
    CommonModule,
    FormsModule,
    MatInputModule,
  ],
  templateUrl: './recuperar-senha.component.html',
  styleUrls: ['./recuperar-senha.component.scss']
})
export class RecuperarSenhaComponent {
  email: string = '';
  mensagemRecuperacao: string = '';
  mensagemClasse: string = '';
  isLoading = false;

  constructor(private loginService : LoginService){
    
  }

enviarRecuperacao() {
  this.mensagemRecuperacao = '';
  this.mensagemClasse = '';
  this.isLoading = true;

  this.loginService.forgotPassword(this.email).subscribe({
    next: (response) => {
      this.isLoading = false;

      if (response) { 
        this.mensagemRecuperacao = 'Um e-mail de recuperação foi enviado!';
        this.mensagemClasse = 'sucesso';
      } else { 
        this.mensagemRecuperacao = 'Erro inesperado. Tente novamente.';
        this.mensagemClasse = 'erro';
      }
    },
    error: () => {
      this.isLoading = false; 
      this.mensagemRecuperacao = 'Erro ao enviar a recuperação. Verifique o e-mail informado.';
      this.mensagemClasse = 'erro';
    }
  });
}
  
}
