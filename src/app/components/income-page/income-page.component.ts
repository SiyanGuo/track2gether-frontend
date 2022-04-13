import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/models/transaction-category';
import { TransactionsService } from 'src/app/services/transactions.service';

@Component({
  selector: 'app-income-page',
  templateUrl: './income-page.component.html',
  styleUrls: ['./income-page.component.css']
})
export class IncomePageComponent implements OnInit {
  typeId=1;
  // category = ["salary", "investment", "other"];

  constructor(private route: ActivatedRoute, ) { }

  ngOnInit(): void {
  }

}
