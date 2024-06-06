import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { applicationUrls } from '../urls';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor(private http: HttpClient) {}

  getTransactionList(payload: any) {
    return this.http.get(applicationUrls.transaction + 'list' + payload);
  }

  updateTransaction(data: any) {
    return this.http.put(applicationUrls.transaction + 'update', data);
  }
}
