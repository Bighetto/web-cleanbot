import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CsvService {

  // private apiUrl: string = `${environment.apiUrl}/authenticate`;

  private apiUrl: string = 'http://localhost:8080/queries';

  constructor(private http: HttpClient) {}

  uploadFile(file: File, email: string, token: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    const headers = new HttpHeaders({
      token: `${token}`,
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
}
