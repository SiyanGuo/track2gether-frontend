import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-expense-page',
  templateUrl: './expense-page.component.html',
  styleUrls: ['./expense-page.component.css']
})
export class ExpensePageComponent implements OnInit {
  type!: string;

  //call the service and dynamically retrive from backend & need to get a handle of ID
  category=["Housing", "Food", "Transportation", "Clothing", "Utility", "Other"]

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // retreive url parameter
    this.type = this.route.snapshot.url[0].path;
  }

}
