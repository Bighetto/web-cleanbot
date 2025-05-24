import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import {MatCardModule} from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { BancoRegistroComponent } from '../../components/banco-registro/banco-registro.component';
import { MatDialog } from '@angular/material/dialog';
import { Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { BancoService } from '../../services/banco.service';
import { BankUserResponse } from '../../models/bank.user.response.model';
import { Router, RouterModule } from '@angular/router';
import { BancoStorageService } from '../../services/banco-storage-service.service';


@Component({
  selector: 'app-bancos',
  standalone: true,
  imports: [MatCardModule, MatIcon, CommonModule,RouterModule],
  templateUrl: './bancos.component.html',
  styleUrl: './bancos.component.scss'
})
export class BancosComponent implements OnInit {

  authToken: string | null = null;
  nome: string | null = null;
  email: string | null = null;

  bankLogoMap: { [key: string]: string } = {
    'V8 Digital': '/img/v8Logo.png',
    'Banco XPTO': 'assets/xpto-logo.png',
    'Meu Banco': 'assets/meu-banco-logo.png'
  };
  

  constructor(
    private dialog: MatDialog, 
    @Inject(PLATFORM_ID) private platformId: Object, 
    private bancoService: BancoService, 
    private router : Router, 
    private bancoStorage: BancoStorageService) {
    if (isPlatformBrowser(this.platformId)) {
      this.authToken = localStorage.getItem('authToken') || '';
      this.nome = localStorage.getItem('nome') || 'Usuário';
      this.email = localStorage.getItem('email') || '';
    } else {
      this.authToken = '';
      this.nome = 'Usuário';
      this.email = '';
    }

  }
  bancos: BankUserResponse[] = [];

  userBancos : BankUserResponse[] = [];


  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const email = localStorage.getItem('email') || '';
  
      this.bancoService.findBankUser(email).subscribe({
        next: (res) => {
          const nomesUnicos = new Set();
          this.bancos = res.filter(banco => {
            this.userBancos.push(banco)
            if (!nomesUnicos.has(banco.bankName)) {
              nomesUnicos.add(banco.bankName);
              return true;
            }
            return false;
          });
          console.log('Bancos únicos do usuário:', this.bancos);
        },
        error: (err) => {
          console.error('Erro ao carregar bancos:', err);
        }
      });
    }
  }

  redirecionarParaBanco(nomeBanco: string) {
    this.router.navigate(['/home/detalhes-banco/', nomeBanco], {
    });
  }
  

  abrirRegistroBanco() {
    this.dialog.open(BancoRegistroComponent, {
      width: '80vw',
      height: '85vh', 
      maxWidth: '900px',
      disableClose: false,
      panelClass: 'custom-dialog-container'
    });
  }  

}
