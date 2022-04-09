import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  currentRoute!:string; 
  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.currentRoute= this.route.snapshot.url[0].path;

  }

}
