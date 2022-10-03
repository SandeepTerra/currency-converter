import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class CurrencyConversionServiceService {

  constructor(private http: HttpClient) { 

  }

  getCurrencies(): Observable<Currency[]> {

    //const url = 'assets/Currency.json';//testing
    const url = "https://localhost:44384/api/currency";//live
    return this.http.get<Currency[]>(url);
  }

  getlatestExchangeRate(frmCur: string, toCur: string): Observable<any> {
    
    //const url = 'assets/2022-10-01.json';//testing
    const url = "https://localhost:44384/api/currency/" + frmCur + "/" + toCur+"/" + "2";//live
    return this.http.get<any>(url);
  }

  getHistory(frmCur: string, toCur: string): Observable<HistoryData[]> {

    const url = "https://localhost:44384/api/currency/history/" + frmCur + "/" + toCur;
    return this.http.get<HistoryData[]>(url);

  }

}

export interface Currency {
  
  code: string;
  name: string;
}

export interface HistoryData {
  
  baseCur: string;
  exchangeCur: string;
  date: string;
  value: number;
}

