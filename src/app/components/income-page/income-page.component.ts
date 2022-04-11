import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-income-page',
  templateUrl: './income-page.component.html',
  styleUrls: ['./income-page.component.css']
})
export class IncomePageComponent implements OnInit {
  type!:string; 
  //will retrive from back end
  category=["Salary", "Investment", "Other"];

  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {
        // retreive url parameter
        this.type= this.route.snapshot.url[0].path;
  }

}
