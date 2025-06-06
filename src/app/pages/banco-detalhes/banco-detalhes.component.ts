import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { BancoRegistroComponent } from '../../components/banco-registro/banco-registro.component';
import { BankUserResponse } from '../../models/bank.user.response.model';
import { BancoService } from '../../services/banco.service';
import { CsvService } from '../../services/csv.service';
import { WebSocketService } from '../../services/web-socket-service.service';

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
    MatSelectModule,
    FormsModule,
  ],
  templateUrl: './banco-detalhes.component.html',
  styleUrls: ['./banco-detalhes.component.scss'],
})
export class BancoDetalhesComponent implements OnInit, OnDestroy {
  nomeBanco: string | null = null;
  usuarios: BankUserResponse[] = [];
  nome: string | null = null;
  email: string;
  logConsultas: string[] = [];

  cpfsConsultados = 0;
  saldos = 0;
  naoAutorizado = 0;
  semSaldo = 0;
  erros = 0;

  csvId = '';
  quantidadeCpfs = 0;
  quantidadeUsuariosExecutar: number = 0;
  usuariosSelecionados: any[] = [];
  botaoTexto: string = 'Iniciar';

  mostrarSelecaoBanco: boolean = false;

  private websocketSubscription: Subscription | null = null;

  bancos: BankUserResponse[] = [];

  userBancos: BankUserResponse[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: CsvService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private webSocketService: WebSocketService,
    private dialog: MatDialog,
    private bancoService: BancoService
  ) {
    this.route.paramMap.subscribe((params) => {
      this.nomeBanco = params.get('nomeBanco');
      console.log('Banco selecionado:', this.nomeBanco);
    });

    if (isPlatformBrowser(this.platformId)) {
      this.nome = localStorage.getItem('nome') || 'Usuário';
      this.email = localStorage.getItem('email') || '';
    } else {
      this.nome = 'Usuário';
      this.email = '';
    }

    const nav = this.router.getCurrentNavigation();
    this.usuarios = this.userBancos;
  }

  ngOnInit(): void {
    if (this.email) {
      this.service.buscarStatusPorEmail(this.email).subscribe({
        next: (status) => {
          this.quantidadeCpfs = status.quantidadeDocumentos;
          this.csvId = status.idCsv;
          this.cpfsConsultados = status.results.total_consultas || 0;
          this.saldos = status.results.com_saldo || 0;
          this.naoAutorizado = status.results.nao_autorizado || 0;
          this.semSaldo = status.results.sem_saldo || 0;
          this.erros = status.results.erro || 0;
        },
        error: () => {
          this.quantidadeCpfs = 0;
          this.cpfsConsultados = 0;
          this.saldos = 0;
          this.naoAutorizado = 0;
          this.semSaldo = 0;
          this.erros = 0;
        },
      });

      this.bancoService.findBankUser(this.email).subscribe({
        next: (res) => {
          const nomesUnicos = new Set();
          this.bancos = res.filter((banco) => {
            this.userBancos.push(banco);
            if (!nomesUnicos.has(banco.bankName)) {
              nomesUnicos.add(banco.bankName);
              return true;
            }
            return false;
          });
          console.log('Bancos únicos do usuário:', this.bancos);
        },
        error: (err) => {},
      });

      this.webSocketService.connect(this.email);

      this.websocketSubscription = this.webSocketService.messages$.subscribe(
        (message: string) => {
          this.logConsultas.push(message);
          this.processarMensagemWebSocket(message);
          console.log('Mensagem recebida:', message);
          if (this.logConsultas.length > 20) {
            this.logConsultas.shift();
          }
        }
      );
    }
  }

  ngOnDestroy(): void {
    if (this.websocketSubscription) {
      this.websocketSubscription.unsubscribe();
    }
    this.webSocketService.close(); // Fechar a conexão WebSocket ao destruir o componente
  }

  // Função para enviar uma mensagem via WebSocket
  sendMessage(): void {
    if (this.email) {
      const message = { email: this.email, text: 'Mensagem do WebSocket' };
      this.webSocketService.sendMessage(message);
      console.log('Mensagem enviada:', message);

      // Adiciona a mensagem ao log de consultas
      this.logConsultas.push(`Mensagem enviada: ${JSON.stringify(message)}`);
    }
  }

  processarMensagemWebSocket(mensagem: string): void {
    const resultadoRegex = /RESULTADO:\s*(.*)$/i;
    const match = mensagem.match(resultadoRegex);

    if (!match || !match[1]) {
      return;
    }

    const resultadoRaw = match[1].trim();

    const valorNumerico = parseFloat(resultadoRaw.replace(',', '.'));

    if (!isNaN(valorNumerico)) {
      this.cpfsConsultados++;
      this.saldos++;
      return;
    }

    const resultado = resultadoRaw.toUpperCase();

    switch (resultado) {
      case 'NÃO AUTORIZADO':
        this.cpfsConsultados++;
        this.naoAutorizado++;
        break;
      case 'SEM SALDO':
        this.cpfsConsultados++;
        this.semSaldo++;
        break;
      case 'CPF INVÁLIDO':
      case 'ERRO NA REQUISIÇÃO':
        this.cpfsConsultados++;
        this.erros++;
        break;
      default:
        this.cpfsConsultados++;
        this.erros++;
        break;
    }
  }

  onUsuariosSelecionadosChange() {
    this.quantidadeUsuariosExecutar = this.usuariosSelecionados.length;
  }

  executeProcessing() {
    const usuariosIds = this.usuariosSelecionados.map((usuario) => usuario.id);
    this.service
      .executarProcessamento(this.csvId, this.email, usuariosIds)
      .subscribe({
        next: (processoId) => {
          console.log('Processo iniciado com ID:', processoId);
          localStorage.setItem('processoIdAtivo', processoId);
        },
        error: (err) => {
          console.error('Erro ao iniciar processamento.');
        },
      });
  }

  pararProcesso() {
    this.service.pararProcessamento(this.email).subscribe({
      next: (msg) => {
        console.log(msg);
        alert(msg);
        localStorage.removeItem('processoIdAtivo');
      },
      error: (err) => {
        console.error('Erro ao tentar parar o processo:', err);
      },
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      console.log('Arquivo selecionado:', file);

      if (!this.email) {
        console.error('Email ausente!');
        return;
      }

      this.service.uploadFile(file, this.email).subscribe({
        next: (res) => {
          console.log(res);
          this.csvId = res.csvId;
          window.location.reload();
        },
        error: (err) => {
          console.error('Falha no upload', err);
        },
      });
    }
  }

  abrirRegistroBanco() {
    const dialogRef = this.dialog.open(BancoRegistroComponent, {
      width: '100%',
      height: '85vh',
      maxWidth: '450px',
      disableClose: false,
      panelClass: 'custom-dialog-container',
      data: { mostrarSelecaoBanco: this.mostrarSelecaoBanco },
    });

    dialogRef.afterClosed().subscribe(() => {
      window.location.reload();
    });
  }

  zerarResultados() {
    this.service.zerarResultados(this.email).subscribe({
      next: () => {},
      error: (err) => {
        console.error('Erro ao zerar resultados:', err);
      },
    });
    window.location.reload();
  }

  exportarResultado() {
    this.service.exportarResultado(this.email).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'resultado.xlsx';
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error('Erro ao exportar o arquivo', err);
      },
    });
  }
}
