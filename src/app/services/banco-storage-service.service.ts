import { Injectable } from '@angular/core';
import { BankUserResponse } from '../models/bank.user.response.model';

@Injectable({
  providedIn: 'root'
})
export class BancoStorageService {
  private userBancos: BankUserResponse[] = [];

  setBancos(bancos: BankUserResponse[]) {
    this.userBancos = bancos;
  }

  getBancos(): BankUserResponse[] {
    return this.userBancos;
  }

  clear() {
    this.userBancos = [];
  }
}
