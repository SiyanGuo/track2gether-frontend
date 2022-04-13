import { Component, OnInit } from '@angular/core';
import { ChartService } from 'src/app/services/chart.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentMonth = new Date().toLocaleString('default', { month: 'long' })

  user = JSON.parse(localStorage.getItem("user_info") || "");
  firstName = this.user.firstName;

  // monthsArray: String[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  // months = this.monthsArray.filter((e, index) => {
  //   return index <= this.currentMonth
  // });

  constructor(private chartService: ChartService) { }

  ngOnInit(): void {
    this.chartService.getIncomeAndExpenses();
  }

}
