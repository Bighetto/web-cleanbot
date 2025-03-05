import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { LoginResponse } from '../models/login.response.model';
// import { environment } from 'src/environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // private apiUrl: string = `${environment.apiUrl}/authenticate`;

  private apiUrl: string = `http://localhost:8080/user/authenticate`;


  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<LoginResponse> {
    const body = { email, password };
    return this.http.post<LoginResponse>(this.apiUrl, body).pipe(
      catchError((error) => {
        console.error('Erro no login', error);
        throw error; 
      })
    );
  }
}
