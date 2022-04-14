import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-expense-page',
  templateUrl: './expense-page.component.html',
  styleUrls: ['./expense-page.component.css']
})
export class ExpensePageComponent implements OnInit {
  typeId=2;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if(!this.authService.isLoggedIn) {
      this.router.navigate(["login"]);
    }
  }

}
