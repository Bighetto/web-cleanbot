import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon'; // se usar ícones
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, RouterModule } from '@angular/router';


@Component({
  selector: 'app-recuperar-senha-form',
  standalone: true,
  imports: [MatFormFieldModule,
    MatCardModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './recuperar-senha-form.component.html',
  styleUrl: './recuperar-senha-form.component.scss'
})
export class RecuperarSenhaFormComponent implements OnInit {
  formulario: FormGroup;
  token: string = '';
  erro: string = '';
  sucesso: string = '';
  hideSenha = true;
  hideConfirmar = true;


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {
    this.formulario = this.fb.group({
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmarSenha: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.token = params['token'];
    });
  }

  onSubmit(): void {
    const { senha, confirmarSenha } = this.formulario.value;

    if (senha !== confirmarSenha) {
      this.erro = 'As senhas não coincidem.';
      this.sucesso = '';
      return;
    }

    this.http.post('http://localhost:8080/user/resetPassword', { //TODO: AJUSTAR QUANDO TIVER PRONTO O ENDPOINT NA API
      token: this.token,
      novaSenha: senha
    }).subscribe({
      next: () => {
        this.sucesso = 'Senha alterada com sucesso!';
        this.erro = '';
        this.formulario.reset();
      },
      error: () => {
        this.erro = 'Erro ao alterar senha. Tente novamente.';
        this.sucesso = '';
      }
    });
  }
}
