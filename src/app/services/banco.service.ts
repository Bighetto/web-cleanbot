import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { BankUserResponse } from '../models/bank.user.response.model';
import { UploadBankUserRestModel } from '../models/upload.bank.user.restmodel';

@Injectable({
  providedIn: 'root'
})
export class BancoService {

  // private apiUrl: string = `${environment.apiUrl}/authenticate`;

  private apiUrl: string = `http://localhost:8080/bank`;

  constructor(private http: HttpClient) {}

  findBankUser(email: string): Observable<BankUserResponse[]> {

    return this.http.get<BankUserResponse[]>(
      this.apiUrl.concat(`/${email}`)).pipe(
      catchError((error) => {
        throw error; 
      })
    );

    // const responseMock: BankUserResponse = {
    //   id: '123456',
    //   bankName: 'V8 Digital',
    //   username: 'Teste',
    //   nickname: 'Testee',
    // };

    // return of([responseMock, responseMock])
  }

  salvarBanco(dados: UploadBankUserRestModel): Observable<any> {
    
    return this.http.post(this.apiUrl, dados, { withCredentials: true }).pipe(
      catchError(error => {
        throw error;
      })
    );;
  }
  
}
