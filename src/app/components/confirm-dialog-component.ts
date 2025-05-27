import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>Confirmação</h2>
    <mat-dialog-content>
      Tem certeza que deseja deletar este usuário?
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button 
        mat-flat-button 
        [ngStyle]="{'background-color': '#1B263B', 'color': '#FFFFFF'}"
        [mat-dialog-close]="false">
        Cancelar
      </button>
      
      <button 
        mat-flat-button 
        color="warn" 
        [mat-dialog-close]="true">
        Deletar
      </button>
    </mat-dialog-actions>
  `
})
export class ConfirmDialogComponent {}
