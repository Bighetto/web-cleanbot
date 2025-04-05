import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service'; // ajuste o caminho se necessário

@Component({
  selector: 'app-recuperar-senha-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
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
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService
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

    this.isLoading = true;

    this.userService.renewPassword(this.token, senha).subscribe({
      next: () => {
        this.sucesso = 'Senha alterada com sucesso!';
        this.erro = '';
        this.formulario.reset();
        this.isLoading = false;
      },
      error: () => {
        this.erro = 'Erro ao alterar senha. Tente novamente.';
        this.sucesso = '';
        this.isLoading = false;
      }
    });
  }
}
