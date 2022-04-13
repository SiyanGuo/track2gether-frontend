import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  apiResponse:Subject<Response> = new Subject();

  constructor(private http: HttpClient) { }

  getIncomeAndExpenses() {
    const url = "https://cors-anywhere.herokuapp.com/https://quickchart.io/chart.create";
    // const url = "https://quickchart.io/chart.create";

    this.http.post(url, {
      "backgroundColor": "#fff",
      "width": 500,
      "height": 300,
      "devicePixelRatio": 1.0,
      "chart": {
        "type": "pie",
        "data": {
          "labels": ["income", "expenses"],
          "datasets": [
            {
              "label": "Users",
              "data": [2900, 1200]
            }
          ]
        }

      }
    }, {   'observe': 'response',}
    ).pipe(catchError(this.handleError('getIncomeAndExpenses', [])))
      .subscribe( data => {
        console.log("chart", data);
      })
  };

  private handleError<T>(operation = 'operation', reuslt?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(reuslt as T);
    }
  };
}
