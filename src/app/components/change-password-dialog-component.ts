import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-change-password-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule
  ],
  template: `
    <h2 mat-dialog-title>Trocar Senha</h2>
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <mat-dialog-content>
        <mat-form-field appearance="fill" style="width: 100%;">
          <mat-label>Nova Senha</mat-label>
          <input matInput type="password" formControlName="password" required>
          <mat-error *ngIf="form.controls['password'].hasError('required')">
            A nova senha é obrigatória
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="fill" style="width: 100%;">
          <mat-label>Confirmar Senha</mat-label>
          <input matInput type="password" formControlName="confirmPassword" required>
          <mat-error *ngIf="form.hasError('passwordMismatch')">
            As senhas não coincidem
          </mat-error>
          <mat-error *ngIf="form.controls['confirmPassword'].hasError('required')">
            A confirmação da senha é obrigatória
          </mat-error>
        </mat-form-field>
      </mat-dialog-content>

      <mat-dialog-actions align="end">
        <button mat-button type="button" (click)="onCancel()"
        [ngStyle]="{'background-color': '#1B263B', 'color': '#FFFFFF'}" >Cancelar</button>
        <button mat-flat-button color="primary" type="submit" [disabled]="form.invalid" 
        color="warn" 
        >Alterar</button>
      </mat-dialog-actions>
    </form>
  `
})
export class ChangePasswordDialogComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ChangePasswordDialogComponent>
  ) {
    this.form = this.fb.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }, { validators: this.passwordsMatch });
  }

  passwordsMatch(group: FormGroup) {
    const pass = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return pass === confirm ? null : { passwordMismatch: true };
  }

  get password() {
    return this.form.get('password');
  }
  
  onSubmit() {
    if (this.form.valid) {
      this.dialogRef.close(this.password?.value);
    }
  }

  onCancel() {
    this.dialogRef.close(null);
  }
}
