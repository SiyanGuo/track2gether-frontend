import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Record } from '../models/record';
import { Category } from '../models/transaction-category';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  newTransactionList: Subject<Record[]> = new Subject();
  constructor(private http: HttpClient, private authSerivice: AuthService) { }

  user = JSON.parse(localStorage.getItem("user_info") || "");
  userId = this.user.id;
  spouseId = this.user.spouseId;
  jwt = JSON.parse(localStorage.getItem('jwt') || "");


  deleteTransaction(transactionId: number) {
    const url = `${environment.BACKEND_URL}/users/${this.userId}/transaction/${transactionId}`;
    return this.http.delete(url, {
      'headers': {
        'Authorization': `Bearer ${this.jwt}`
      }
    }).pipe(catchError(this.handleError<Record[]>('getAllTransactionsByType', [])))
  };

  addTransaction(id: number, amount: number, categoryId: number, date: string, description: string, shared: boolean) {
    const url = `${environment.BACKEND_URL}/users/${id}/transaction`;
    return this.http.post<Record>(url, {
      'amount': amount,
      'categoryid': categoryId,
      'date': date,
      'description': description,
      'shared': shared
    }, {
      'observe': 'response',
      'headers': {
        'Authorization': `Bearer ${this.jwt}`
      }
    }).pipe(catchError(this.handleError<Record[]>('addMyTransactions', [])))
  };

  updateTransaction(id: number, transactionId: number, amount: number, categoryId: number, date: string, description: string, shared: boolean) {
    const url = `${environment.BACKEND_URL}/users/${id}/transaction/${transactionId}`;
    return this.http.put<Record>(url, {
      'amount': amount,
      'categoryid': categoryId,
      'date': date,
      'description': description,
      'shared': shared
    }, {
      'observe': 'response',
      'headers': {
        'Authorization': `Bearer ${this.jwt}`
      }
    }).pipe(catchError(this.handleError<Record[]>('updateMyTransactions', [])))
  };

  getAllTransactionsByType(typeId: number) {
    const url = `${environment.BACKEND_URL}/users/${this.userId}/transactions?transtype=${typeId}`;
    this.http.get<Record[]>(url, {
      'headers': {
        'Authorization': `Bearer ${this.jwt}`
      }
    }).pipe(catchError(this.handleError<Record[]>('getAllTransactionsByType', [])))
      .subscribe(data => { this.newTransactionList.next(data);})
  };

  getAllTransactions(): Observable<Record[]> {
    const url = `${environment.BACKEND_URL}/users/${this.spouseId}/transactions`;
    return this.http.get<Record[]>(url, {
      'headers': {
        'Authorization': `Bearer ${this.jwt}`
      }
    }).pipe(catchError(this.handleError<Record[]>('getAllTransactions', [])))
  };


  getMonthlyTransactions(month:number): Observable<Record[]> {
    const url = `${environment.BACKEND_URL}/users/${this.userId}/transactions/filterby?month=${month}&year=2022`;
    return this.http.get<Record[]>(url, {
      'headers': {
        'Authorization': `Bearer ${this.jwt}`
      }
    }).pipe(catchError(this.handleError<Record[]>('getAllTransactions', [])))
  };

  getCategories(typeId: number): Observable<Category[]> {
    const url = `${environment.BACKEND_URL}/category?type=${typeId}`;
    return this.http.get<Category[]>(url
    ).pipe(catchError(this.handleError<Category[]>('getCategories', [])))
  };

  private handleError<T>(operation = 'operation', reuslt?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(reuslt as T);
    }
  };
}
