
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable, resolveForwardRef } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { UserInfo } from "../models/user-info";
import { User } from "../models/user-models";


@Injectable({
  providedIn: "root",
})
export class AuthService {
  loginErrorSubject: Subject<string> = new Subject<string>(); //for error message

  isLoggedin = false;
  currentUser:any;

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
          "email": email, // header
          "password": password,
        },
        {
          "observe": "response", 
        }
      )
      .subscribe(
        (res) => {
         
          const jwt = res.headers.get("token");

          localStorage.setItem("jwt", JSON.stringify(jwt));
          localStorage.setItem("user_info", JSON.stringify(res.body));

          this.isLoggedin=true;
          this.currentUser=res.body;
          console.log("currentUser", this.currentUser)
          this.router.navigate(["dashboard"]);
        },
        (err) => {
          const errorMessage = err.error;
          this.loginErrorSubject.next(errorMessage); // Publish information to the loginErrorSubject
        }
      );
  }
}
