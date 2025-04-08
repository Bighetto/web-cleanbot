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


@Component({
  selector: 'app-bancos',
  standalone: true,
  imports: [MatCardModule, MatIcon, CommonModule],
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
  

  constructor(private dialog: MatDialog, @Inject(PLATFORM_ID) private platformId: Object, private bancoService: BancoService) {
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


  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const email = localStorage.getItem('email') || '';
      const token = localStorage.getItem('authToken') || '';
  
      this.bancoService.findBankUser(email, token).subscribe({
        next: (res) => {
          const nomesUnicos = new Set();
          this.bancos = res.filter(banco => {
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
  

  abrirRegistroBanco() {
    this.dialog.open(BancoRegistroComponent, {
      width: '80vw',
      height: '80vh', 
      maxWidth: '1000px',
      disableClose: false,
      panelClass: 'custom-dialog-container'
    });
  }  

}
