import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class CsvService {

  // private apiUrl: string = `${environment.apiUrl}/authenticate`;

  private apiUrl: string = `http://localhost:8080/queries/`;

  constructor(private http: HttpClient) {}

  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
  
    return this.http.post<any>(this.apiUrl.concat('upload'), formData).pipe(
      catchError((error) => {
        console.error('Erro no upload do CSV', error);
        throw error;
      })
    );
  }
  
}
