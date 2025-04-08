import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { LoginResponse } from '../models/login.response.model';
import { BankUserResponse } from '../models/bank.user.response.model';

@Injectable({
  providedIn: 'root'
})
export class BancoService {

  // private apiUrl: string = `${environment.apiUrl}/authenticate`;

  private apiUrl: string = `http://localhost:8080/bank/`;

  constructor(private http: HttpClient) {}

  findBankUser(email: string, token: string): Observable<BankUserResponse[]> {

    const headers = new HttpHeaders({
      token: `${token}`
    });
    return this.http.get<BankUserResponse[]>(
      this.apiUrl.concat(email),
      { headers }).pipe(
      catchError((error) => {
        throw error; 
      })
    );

    // const responseMock: BankUserResponse = {
    //   bankName: 'V8 Digital',
    //   username: 'Teste',
    //   nickname: 'Testee',
    //   // outros campos mockados...
    // };

    // return of([responseMock])
  }
}
