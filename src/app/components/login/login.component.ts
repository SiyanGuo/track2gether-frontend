import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  form: any = {
    email: null,
    password: null,
  };

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = "";
  // tokenStorage: any;
  // isLogginFailed: boolean;
  // isLogginFailed: boolean | undefined;
  // tokenStorage: any;

  constructor(
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    
  }

  onSubmit(): void {
    const { email, password } = this.form;
    this.authService.login(email, password).subscribe(
      (data) => {
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.reloadPage();
      },
      (err) => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }
  reloadPage(): void {
    window.location.reload();
  }
}
