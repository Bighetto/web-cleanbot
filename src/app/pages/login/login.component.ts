import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,
     MatButtonModule, 
     MatCardModule, 
     MatFormFieldModule, 
     MatInputModule,
     MatIcon
    ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  errorMessage: string = '';
  hide: boolean = true;


  constructor(private service: LoginService, private router : Router) {}

  onSubmit() {
    this.service.login(this.email, this.password).subscribe(
      (response) => {
        console.log('Login bem-sucedido:', response);
        
        localStorage.setItem('authToken', response.token);
        
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Erro no login:', error);
        this.errorMessage = 'Credenciais inválidas. Tente novamente.';
      }
    );  
    // this.router.navigate(['/home']);
  }

  esqueciMinhaSenha(){

  }

}
