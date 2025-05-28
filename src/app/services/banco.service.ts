import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';
import { BankUserResponse } from '../models/bank.user.response.model';
import { UploadBankUserRestModel } from '../models/upload.bank.user.restmodel';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class BancoService {

  private apiUrl: string = `${environment.apiUrl}/bank`;

  // private apiUrl: string = `http://localhost:8080/bank`;

  constructor(private http: HttpClient) {}

  findBankUser(email: string): Observable<BankUserResponse[]> {

    return this.http.get<BankUserResponse[]>(
      this.apiUrl.concat(`/${email}`)).pipe(
      catchError((error) => {
        throw error; 
      })
    );
  }

  salvarBanco(dados: UploadBankUserRestModel): Observable<any> {
    
    return this.http.post(this.apiUrl, dados, { withCredentials: true }).pipe(
      catchError(error => {
        throw error;
      })
    );;
  }

  deleteBankUser(bankUserId: string): Observable<void> {
    const url = `${this.apiUrl}/${bankUserId}`;
    return this.http.delete<void>(url).pipe(
      catchError(error => {
        console.error('Erro ao deletar usuário do banco', error);
        return throwError(() => error);
      })
    );
  }
  
}
