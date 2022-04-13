import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-expense-page',
  templateUrl: './expense-page.component.html',
  styleUrls: ['./expense-page.component.css']
})
export class ExpensePageComponent implements OnInit {
  typeId=2;

  category=["housing", "food", "transportation", "clothing", "utilities", "other"]

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

}
