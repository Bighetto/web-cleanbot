import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { FindCsvStatusRestModel } from '../models/find.csv.status.rest.model';

@Injectable({
  providedIn: 'root'
})
export class CsvService {

  // private apiUrl: string = `${environment.apiUrl}/authenticate`;

  private apiUrl: string = 'http://localhost:8080/queries';

  constructor(private http: HttpClient) {}

  uploadFile(file: File, email: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    const headers = new HttpHeaders({
      email: `${email}`
    });

    return this.http.post<any>(
      this.apiUrl.concat("/upload"),
      formData,
      { headers }
    ).pipe(
      catchError((error) => {
        throw error;
      })
    );
  }

  buscarStatusPorEmail(email: string): Observable<FindCsvStatusRestModel> {
    const url = `${this.apiUrl}/status/${encodeURIComponent(email)}`;
    return this.http.get<FindCsvStatusRestModel>(url);
  }

  executarProcessamento(csvId: string, email: string, usuarios: string[]): Observable<string> {
    const body = { csvId, email, usuarios };
    
    return this.http.post<{ processoId: string }>(
      `${this.apiUrl}/executar`,
      body
    ).pipe(
      map(response => response.processoId),
      catchError((error) => {
        throw error;
      })
    );
  }

  
  pararProcessamento(email: string): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/parar/${email}`, {})
      .pipe(
        catchError(error => {
          throw error;
        })
      );
  }

  zerarResultados(email: string): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/zerar-resultados/${email}`);
  }
  
  exportarResultado(email: string): Observable<Blob> {
    return this.http.post(
      `${this.apiUrl}/export/${email}`,
      null,
      { responseType: 'blob' }
    );
  }  
  
  
}
