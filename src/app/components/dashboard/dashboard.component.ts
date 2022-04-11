import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentMonth = new Date().getMonth();

  monthsArray: String[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  months = this.monthsArray.filter((e, index) => {
    return index <= this.currentMonth
  });

  constructor() { }

  ngOnInit(): void {

  }

}
