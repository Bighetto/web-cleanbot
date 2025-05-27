import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { BankUserResponse } from '../../models/bank.user.response.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog-component';
import { BancoService } from '../../services/banco.service';
import { ChangePasswordDialogComponent } from '../../components/change-password-dialog-component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatListModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent {

  bancos: string[] = [];
  bancoSelecionado: string | null = null;
  nome: string | null = null;
  email: string;
  plano: string;

  usuariosBanco: BankUserResponse[] = [];

  dados: BankUserResponse[] = []

  constructor(private dialog: MatDialog, 
    @Inject(PLATFORM_ID) private platformId: Object,
    private bancoService: BancoService,
    private userService : UserService) {

      if (isPlatformBrowser(this.platformId)) {
        this.nome = localStorage.getItem('nome') || 'Usuário';
        this.email = localStorage.getItem('email') || ''; 
        this.plano = localStorage.getItem('planName') || '';
      } else {
        this.nome = 'Usuário';
        this.email = '';
        this.plano = '';
      }
  }


  ngOnInit(): void {
    if (this.email) {
    this.bancoService.findBankUser(this.email).subscribe({
      next: (users) => {
        this.dados = users;
        this.bancos = [...new Set(this.dados.map(d => d.bankName))];
      },
      error: (error) => {
        console.error('Erro ao buscar usuários', error);
      }
    });
    }


  }

  carregarUsuarios() {
    this.usuariosBanco = this.dados.filter(d => d.bankName === this.bancoSelecionado);
  }

  deletarUsuario(usuarioId: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      disableClose: true
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if (result === true) {
        this.bancoService.deleteBankUser(usuarioId).subscribe({
          next: () => {
            this.dados = this.dados.filter(u => u.id !== usuarioId);
            this.carregarUsuarios();
            window.location.reload();
          },
          error: (error) => {
            console.error('Erro ao deletar usuário', error);
          }
        });
      } else {
        console.log('Cancelado');
      }
    });
  }

  trocarSenha() {
    const dialogRef = this.dialog.open(ChangePasswordDialogComponent, {
      width: '400px',
      disableClose: true
    });
  
    dialogRef.afterClosed().subscribe(newPassword => {
      if (newPassword) {
        if (!this.email) {
          alert('Email não encontrado');
          return;
        }
  
        this.userService.trocarSenha(this.email, newPassword).subscribe({
          next: (res) => {
            if (res.status === 200) {
              alert('Senha alterada com sucesso!');
            }
          },
          error: (error) => {
            alert('Erro ao alterar senha. Tente novamente.');
          }
        });
      } else {
        console.log('Troca de senha cancelada');
      }
    });
  }
  
  

}
