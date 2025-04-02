import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

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
    FormsModule
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

  constructor(private dialogRef: MatDialogRef<BancoRegistroComponent>) {}

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
    console.log("Banco salvo!");
    this.fechar();
  }
}
