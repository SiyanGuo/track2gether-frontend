import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: '../login/login.component.html',
  styleUrls: ['../login/login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {
    username: null,
    password: null
  };

  isLogginIn = false;
  isLogginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  // tokenStorage: any;
  // isLogginFailed: boolean;
  // isLogginFailed: boolean | undefined;
  // tokenStorage: any;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLogginIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;
    this.authService.login(username, password).subscribe(data => {
      this.tokenStorage.saveToken(data.accessToken);
      this.tokenStorage.saveUser(data);
      this.isLogginFailed = false;
      this.isLogginIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      this.reloadPage();
    }, err => {
      this.errorMessage = err.error.message;
      this.isLogginFailed = true;
    }
    );
  }
  reloadPage(): void {
    window.location.reload();
  }
}
