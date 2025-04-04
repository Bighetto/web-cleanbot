import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { LoginResponse } from '../models/login.response.model';
// import { environment } from 'src/environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // private apiUrl: string = `${environment.apiUrl}/authenticate`;

  private apiUrl: string = `http://localhost:8080/user/`;


  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<LoginResponse> {
    const body = { email, password };
    return this.http.post<LoginResponse>(this.apiUrl.concat('authenticate'), body).pipe(
      catchError((error) => {
        console.error('Erro no login', error);
        throw error; 
      })
    );
  }

  forgotPassword(email: string): Observable<HttpResponse<string>> {
    return this.http.post<string>(
      this.apiUrl.concat('recoverPassword/' + email), 
      {}, 
      { observe: 'response', responseType: 'text' as 'json' }
    ).pipe(
      catchError((error) => {
        console.error('Erro no login', error);
        return throwError(() => error); 
      })
    );
  }
  
  
  
}
