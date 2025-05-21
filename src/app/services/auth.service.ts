import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }
  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('email');
    localStorage.removeItem('nome');
  }


}
