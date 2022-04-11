// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { environment } from 'src/environments/environment';


// const httpOptions = {
//   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
// };


// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   constructor(private http: HttpClient) { }
//   login(email: string, password: string): Observable<any> {
//     return this.http.post(`${environment.BACKEND_URL}/login`, {
//       email,
//       password
//     }, httpOptions);
//   }
  
//   register(firstname: string, lastname: string, email: string, password: string): Observable<any> {
//     return this.http.post(
//       `${environment.BACKEND_URL}/sigup`,
//       {
//         firstname,
//         lastname,
//         email,
//         password,
//       },
//       httpOptions
//     );
    
//   }
// }

import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable, resolveForwardRef } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { UserInfo } from "../models/user-info";
import { User } from "../models/user-models";
// import { UserInfo } from "../models/user-info";
// import { User } from "../models/user-model";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  loginErrorSubject: Subject<string> = new Subject<string>(); //for error message

  constructor(private client: HttpClient, private router: Router) {}

  getUserInfoFromJwt(): Observable<HttpResponse<UserInfo>> {
    return this.client.get<UserInfo>(`${environment.BACKEND_URL}/login`, {
      observe: "response",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
  }

  authenicateUser(email: string, password: string) {
    this.client
      .post<User>(
        `${environment.BACKEND_URL}/login`,
        {
          //URL endpoints to the backend
          "email": email, // header
          "password": password,
        },
        {
          "observe": "response", // This option tells httpClient to give us the entire HttpResponse instead of just the response body,
          // which is what it would have done by default
        }
      )
      .subscribe(
        (res) => {
          const jwt = res.headers.get("token");
          // localStorage.setItem("jwt", jwt);

          localStorage.setItem("user_info", JSON.stringify(res.body));
          console.log(localStorage.getItem("user_info"));
          this.router.navigate(["dashboard"]);
        },
        (err) => {
          const errorMessage = err.error;
          this.loginErrorSubject.next(errorMessage); // Publish information to the loginErrorSubject
        }
      );
  }
}
