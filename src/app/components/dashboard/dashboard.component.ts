import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ChartService } from 'src/app/services/chart.service';
import { TransactionsService } from 'src/app/services/transactions.service';
import { Record } from 'src/app/models/record';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  monthNum = new Date().getMonth() + 1;
  currentMonth = new Date().toLocaleString('default', { month: 'long' })
  url!: string;
  user = JSON.parse(localStorage.getItem("user_info") || "");
  firstName = this.user.firstName;

  totalExpenses!: number;
  totalIncome!: number;

  constructor(private authService: AuthService, private router: Router, private chartService: ChartService, private transactionService: TransactionsService) { }

  ngOnInit(): void {


    this.chartService.apiResponse.subscribe(data => this.url = data.url)
    if (!this.authService.isLoggedIn) {
      this.router.navigate(["login"]);
    }

    this.transactionService.getMonthlyTransactions(this.monthNum).subscribe(list => {
      this.totalExpenses = Math.floor(list.filter(each => { return each.categoryType == "expenses" }).map(each => { return each.amount }).reduce((total, num) => total + num));
      this.totalIncome = Math.floor(list.filter(each => { return each.categoryType == "income" }).map(each => { return each.amount }).reduce((total, num) => total + num));
      this.chartService.getIncomeAndExpenses(this.totalIncome, this.totalExpenses);
    })


  }

}
