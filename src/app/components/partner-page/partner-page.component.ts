import { Component, OnInit } from '@angular/core';
import { TransactionsService } from 'src/app/services/transactions.service';
import { Record } from 'src/app/models/record';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-partner-page',
  templateUrl: './partner-page.component.html',
  styleUrls: ['./partner-page.component.css']
})
export class PartnerPageComponent implements OnInit {

  records!: Record[];
  constructor(private transactionService: TransactionsService, private authService: AuthService, private router: Router) { }
  
  ngOnInit(): void {
    if(!this.authService.isLoggedIn) {
      this.router.navigate(["login"]);
    }
    this.transactionService.getAllTransactions().subscribe((data) => {
      console.log("partner", data);
      this.records = data;
    });
  }
}
