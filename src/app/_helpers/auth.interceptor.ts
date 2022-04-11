// import { HTTP_INTERCEPTORS, HttpEvent } from "@angular/common/http";
// import { Injectable } from "@angular/core";
// import {
//   HttpInterceptor,
//   HttpHandler,
//   HttpRequest,
// } from '@angular/common/http';;
// import { Observable } from 'rxjs';



// const TOKEN_HEADER_KEY = 'Authorization';  //for spring boot backend

// @Injectable() 
// export class AuthInterceptor implements HttpInterceptor{
//     // constructor(private token: TokenStorageService /* get token from auth service*/) {}
//     // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
//     //     let authReq = req;
//     //     const token = this.token.getToken();
//     //     if (token != null) {
//     //         authReq = req.clone({headers: req.headers.set(TOKEN_HEADER_KEY,
//     //             'Bearer ' + token)}
//     //             )
//     //     }
//         // return next.handle(authReq);
//     // }
    
//     return null;
// }

// export const authInterceptorProviders = [
//     { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
// ]


import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class InterceptorService implements HttpInterceptor {
  constructor() {}

  //this service will provide all http headers for any requests in our app
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "OPTIONS, HEAD, GET, POST, PUT, PATCH, DELETE",
        "Access-Control-Allow-Headers":
          "X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding, X-Auth-Token, content-type",
      },
    });

    return next.handle(req);
  }
}