import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${environment.BACKEND_URL}/login`, {
      email,
      password
    }, httpOptions);
  }
  
  register(firstname: string, lastname: string, email: string, password: string): Observable<any> {
    return this.http.post(
      `${environment.BACKEND_URL}/sigup`,
      {
        firstname,
        lastname,
        email,
        password,
      },
      httpOptions
    );
    
  }
}
