import { Component, OnInit } from '@angular/core';
import { TransactionsService } from 'src/app/services/transactions.service';
import { Record } from 'src/app/models/record';

@Component({
  selector: 'app-partner-page',
  templateUrl: './partner-page.component.html',
  styleUrls: ['./partner-page.component.css']
})
export class PartnerPageComponent implements OnInit {

  records!: Record[];
  constructor(private transactionService: TransactionsService) { }


  
  ngOnInit(): void {
    this.transactionService.getAllTransactions().subscribe((data) => {
      console.log("extensedata", data);
      this.records = data;
    });
  }
}
