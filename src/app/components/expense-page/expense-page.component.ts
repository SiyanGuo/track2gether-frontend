import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-expense-page',
  templateUrl: './expense-page.component.html',
  styleUrls: ['./expense-page.component.css']
})
export class ExpensePageComponent implements OnInit {
  type!: string;

  category=["housing", "food", "transportation", "clothing", "utilities", "other"]

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // retreive url parameter
    this.type = this.route.snapshot.url[0].path;
  }

}
