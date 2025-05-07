import { Component, Inject, PLATFORM_ID, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { CsvService } from '../../services/csv.service';
import { BankUserResponse } from '../../models/bank.user.response.model';
import { Subscription } from 'rxjs';

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
export class BancoDetalhesComponent implements OnInit, OnDestroy {
  nomeBanco: string | null = null;
  usuarios: BankUserResponse[] = [];
  authToken: string | null = null;
  nome: string | null = null;
  email: string | null = null;
  logConsultas: string[] = [];  
  private websocketSubscription: Subscription | null = null; 

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private service: CsvService, 
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.route.paramMap.subscribe(params => {
      this.nomeBanco = params.get('nomeBanco');
      console.log('Banco selecionado:', this.nomeBanco);
    });

    if (isPlatformBrowser(this.platformId)) {
      this.authToken = localStorage.getItem('authToken') || '';
      this.nome = localStorage.getItem('nome') || 'Usuário';
      this.email = localStorage.getItem('email') || '';
    } else {
      this.authToken = '';
      this.nome = 'Usuário';
      this.email = '';
    }

    const nav = this.router.getCurrentNavigation();
    this.usuarios = nav?.extras.state?.['userBancos'] || []; 
  }

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    if (this.websocketSubscription) {
      this.websocketSubscription.unsubscribe();
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      console.log('Arquivo selecionado:', file);

      if (!this.email || !this.authToken) {
        console.error('Email ou token ausente!');
        return;
      }

      this.service.uploadFile(file, this.email, this.authToken).subscribe({
        next: (res) => {
          console.log('Upload feito com sucesso!', res);
        },
        error: (err) => {
          console.error('Falha no upload', err);
        },
      });
    }
  }
}
