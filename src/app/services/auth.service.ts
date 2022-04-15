
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable, resolveForwardRef } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { UserInfo } from "../models/user-info";
import { User } from "../models/user-models";


@Injectable({
  providedIn: "root",
})
export class AuthService {
  loginErrorSubject: Subject<string> = new Subject<string>(); //for error message

  private loginStatus = new BehaviorSubject<boolean>(this.checkLoginStatus());

  currentUser: any;

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
          email: email, // header
          password: password,
        },
        {
          observe: "response",
        }
      )
      .subscribe(
        (res) => {
          const jwt = res.headers.get("token");

          localStorage.setItem("jwt", JSON.stringify(jwt));
          localStorage.setItem("user_info", JSON.stringify(res.body));

          this.loginStatus.next(true);
          this.currentUser = res.body;
          console.log("currentUser", this.currentUser);
          this.router.navigate(["dashboard"]);
        },
        (err) => {
          const errorMessage = err.error;
          this.loginErrorSubject.next(errorMessage); // Publish information to the loginErrorSubject
        }
      );
  }

  register(firstname: string, lastname: string,  email: string, password: string): Observable<any> {
    return this.client.post<User>(
      `${environment.BACKEND_URL}/register`,
      {
        firstname,
        lastname,
        email,
        password,
      },
    );
  }

  logout() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("user_info");
    this.router.navigate(["login"]);
    this.loginStatus.next(false);
  }

  checkLoginStatus(): boolean {
    if (localStorage.getItem("jwt")) return true;
    return false;
  }

  get isLoggedIn() {
    return this.loginStatus.asObservable();
  }
}
