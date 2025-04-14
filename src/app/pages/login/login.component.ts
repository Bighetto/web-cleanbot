import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,
     MatButtonModule, 
     MatCardModule, 
     MatFormFieldModule, 
     MatInputModule,
     MatIcon,
     CommonModule
    ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  errorMessage: string = '';
  hide: boolean = true;


  constructor(private service: UserService, private router : Router) {}

  onSubmit() {
    // this.service.login(this.email, this.password).subscribe({
    //   next: (response) => {
    //     console.log('Login bem-sucedido:', response);
        
    //     localStorage.setItem('authToken', response.token);
    //     localStorage.setItem('nome', response.nome);
    //     localStorage.setItem('email', response.email)
        
    //     this.router.navigate(['/home']);
    //   },
    //   error: (error) => {
    //     console.error('Erro no login:', error);
  
    //     if (error.status === 401) {
    //       this.errorMessage = 'E-mail ou senha incorretos.';
    //     } else {
    //       this.errorMessage = 'Ocorreu um erro. Tente novamente mais tarde.';
    //     }
    //   }
    // });

    localStorage.setItem('authToken', 'testeToken');
    localStorage.setItem('nome', 'Arthur Bighetto');
    localStorage.setItem('email', 'arthurbighetto36@gmail.com')
    this.router.navigate(['/home']);
  
  }

  esqueciMinhaSenha(){

    this.router.navigate(['/recuperar-senha']);

  }

}
