import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Record } from '../models/record';
import { Category } from '../models/transaction-category';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(private http: HttpClient, private authSerivice: AuthService) { }


  getAllTransactionsByType(typeId:number): Observable<Record[]> {
    // will need to swap userId
    // const url = `${environment.BACKEND_URL}/users/${this.authSerivice.currentUser.id}/transaction?transtype=1`;
    const url = `${environment.BACKEND_URL}/users/1/transactions?transtype=${typeId}`;
    return this.http.get<Record[]>(url
    ).pipe(catchError(this.handleError<Record[]>('getAllTransactionsByType', [])))
  };


  getAllTransactions():Observable<Record[]> {
    // will need to swap spouseId 
    const url = `${environment.BACKEND_URL}/users/1/transactions`;
    return this.http.get<Record[]>(url
    ).pipe(catchError(this.handleError<Record[]>('getAllTransactions', [])))

  }


  private handleError<T>(operation = 'operation', reuslt?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(reuslt as T);
    }
  }
}
