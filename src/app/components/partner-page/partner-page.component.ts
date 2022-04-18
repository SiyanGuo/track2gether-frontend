import { Component, Input, OnInit } from '@angular/core';
import { TransactionsService } from 'src/app/services/transactions.service';
import { Record } from 'src/app/models/record';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: "app-partner-page",
  templateUrl: "./partner-page.component.html",
  styleUrls: ["./partner-page.component.css"],
})
export class PartnerPageComponent implements OnInit {
  
  @Input()
  typeId!: number;

  type!: string;

  searchText = "";
  records!: Record[];

  userInfo: any;
  spouseFirstName!:string;

  getSpouseName():string{
    this.userInfo = JSON.parse(localStorage.getItem("user_info") || "")
    return this.spouseFirstName = this.userInfo.spouseFirstName;
  }
  currentMonth = new Date().getMonth();
  monthsArray: String[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  months = this.monthsArray.filter((e, index) => {
    return index <= this.currentMonth;
  });

  constructor(
    private transactionsService: TransactionsService,
  ) {}

  // filterByMonth(value: string) {
  //   if (value === "all")
  //     this.transactionService.getAllTransactions();

  //   const monthNum = this.monthsArray.indexOf(value) + 1;

  //   if (this.typeId == 1) this.type = "income";
  //   else this.type = "expenses";

  //   this.transactionService
  //     .getMonthlyTransactions(monthNum)
  //     .subscribe((list) => {
  //       this.records = list.filter((each) => {
  //         return each.categoryType == this.type;
  //       });
  //     });
  // }

  ngOnInit(): void {

    this.transactionsService.getAllTransactions().subscribe((data) => {
      this.records = data;
    });

    this.getSpouseName();
  }
}
