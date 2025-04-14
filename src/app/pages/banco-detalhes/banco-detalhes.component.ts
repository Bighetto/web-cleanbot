import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-banco-detalhes',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  templateUrl: './banco-detalhes.component.html',
  styleUrls: ['./banco-detalhes.component.scss']
})
export class BancoDetalhesComponent {
  nomeBanco: string | null = null;
  usuarios = ['Usuario1', 'Usuario2', 'Usuario3'];

  constructor(private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      this.nomeBanco = params.get('nomeBanco');
      console.log('Banco selecionado:', this.nomeBanco);
    });
  }
}
