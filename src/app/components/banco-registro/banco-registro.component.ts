import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BancoService } from '../../services/banco.service';
import { UploadBankUserRestModel } from '../../models/upload.bank.user.restmodel';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-banco-registro',
  standalone : true,
  imports: [
    MatButtonModule, 
    MatCardModule, 
    MatFormFieldModule, 
    MatInputModule,
    MatSelectModule,
    MatIcon,
    FormsModule,
    CommonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './banco-registro.component.html',
  styleUrls: ['./banco-registro.component.scss']
})
export class BancoRegistroComponent {

  bancoSelecionado: string | null = null;
  imagemBanco: string | null = null;
  hide: boolean = true;
  login: string = '';
  password: string = '';
  nickname: string = '';

  isLoading: boolean = false;
  mensagemSucesso: string | null = null;


  mostrarSelecaoBanco: boolean = true;


  constructor(private dialogRef: MatDialogRef<BancoRegistroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private bancoService: BancoService
  ) {

    if (data?.mostrarSelecaoBanco === false) {
      this.mostrarSelecaoBanco = false;
      this.bancoSelecionado = 'V8';
    }

  }

  atualizarImagem() {
    if (this.bancoSelecionado === 'V8') {
      this.imagemBanco = '/img/v8Logo.png';
    } else {
      this.imagemBanco = null;
    }
  }
  

  fechar() {
    this.dialogRef.close(); 
  }

  salvarBanco() {
    if (!this.bancoSelecionado || !this.login || !this.password) {
      alert('Preencha todos os campos obrigatórios.');
      return;
    }

    const userEmail = localStorage.getItem('email');

    if (!userEmail) {
      alert('Erro ao registrar usuario.');
      return;
    }
  
    this.isLoading = true;
    this.mensagemSucesso = null;
  
    const payload: UploadBankUserRestModel = {
      bankName: this.bancoSelecionado,
      login: this.login,
      password: this.password,
      nickname: this.nickname,
      userEmail: userEmail
    };

    console.log(payload)
  
    this.bancoService.salvarBanco(payload).subscribe({
      next: () => {
        this.isLoading = false;
        this.mensagemSucesso = 'Usuário cadastrado com sucesso!';
        setTimeout(() => {
          this.fechar();
        }, 1500);
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Erro ao salvar banco:', err);
      }
    });
  }
  
}
