// import { Component, OnInit } from '@angular/core';
// import { AuthService } from '../../services/auth.service';


// @Component({
//   selector: "app-login",
//   templateUrl: "./login.component.html",
//   styleUrls: ["./login.component.css"],
// })
// export class LoginComponent implements OnInit {
//   form: any = {
//     email: null,
//     password: null,
//   };

//   isLoggedIn = false;
//   isLoginFailed = false;
//   errorMessage = "";
//   // tokenStorage: any;
//   // isLogginFailed: boolean;
//   // isLogginFailed: boolean | undefined;
//   // tokenStorage: any;

//   constructor(
//     private authService: AuthService,
//   ) {}

//   ngOnInit(): void {
    
//   }

//   onSubmit(): void {
//     const { email, password } = this.form;
//     this.authService.login(email, password).subscribe(
//       (data) => {
//         this.isLoginFailed = false;
//         this.isLoggedIn = true;
//         this.reloadPage();
//       },
//       (err) => {
//         this.errorMessage = err.error.message;
//         this.isLoginFailed = true;
//       }
//     );
//   }
//   reloadPage(): void {
//     window.location.reload();
//   }
// }


import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  errorMessage!: string;
  //fields/properties
  //fields/properties
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
    });

    // Have LoginComponent subscribe to the loginErrorSubject that exists inside of the loginService object
    // Whenever something publishes to the loginErrorSubject, any subscriber will receive that information (callback function
    // will be invoked)
    this.authService.loginErrorSubject.subscribe((errMsg) => {
      this.errorMessage = errMsg;
    });
  }

  loginUser() {
    //1. get login form data from the html form
    const user = this.loginForm.value;
    console.log(user);
    //2. sign user in
    this.authService.authenicateUser(user.email, user.password);
  }
}
