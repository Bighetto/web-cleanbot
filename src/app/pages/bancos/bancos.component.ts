import { Component } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import {MatCardModule} from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { BancoRegistroComponent } from '../../components/banco-registro/banco-registro.component';
import { MatDialog } from '@angular/material/dialog';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-bancos',
  standalone: true,
  imports: [MatCardModule, MatIcon],
  templateUrl: './bancos.component.html',
  styleUrl: './bancos.component.scss'
})
export class BancosComponent {

  authToken: string | null = null;
  nome: string | null = null;
  email: string | null = null;

  constructor(private dialog: MatDialog, @Inject(PLATFORM_ID) private platformId: Object) {
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
