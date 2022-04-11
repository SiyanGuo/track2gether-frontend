import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

 loggedIn = this.authService.isLoggedin;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  logout(){

    // need to fix localStrage 
    window.localStorage.removeItem('jwt');
    window.localStorage.removeItem('user_info');

    this.router.navigate(["login"]);
  }

}
