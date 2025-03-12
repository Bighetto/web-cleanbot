import { Component } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import {MatCardModule} from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { BancoRegistroComponent } from '../../components/banco-registro/banco-registro.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-bancos',
  standalone: true,
  imports: [MatCardModule, MatIcon],
  templateUrl: './bancos.component.html',
  styleUrl: './bancos.component.scss'
})
export class BancosComponent {

  constructor(private dialog: MatDialog) {}

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
