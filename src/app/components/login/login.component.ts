
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
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
    });

    this.authService.loginErrorSubject.subscribe((errMsg) => {
      this.errorMessage = errMsg;
    });
  }

  loginUser() {
    const user = this.loginForm.value;
    console.log(user);
    this.authService.authenicateUser(user.email, user.password);
  }
}
