import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  type!:string; 

  form!: FormGroup;
  amount!:number;
  category!:string;
  date!:string;
  description!:string;

  constructor(private route:ActivatedRoute, private formBuilder: FormBuilder) { }

  addTransaction(formValue:any){

    if(this.form.valid){
      console.log(formValue);
    }

  }

  ngOnInit(): void {
    // retreive url parameter
    this.type= this.route.snapshot.url[0].path;

    this.form = this.formBuilder.group({
      amount: new FormControl(this.amount, [Validators.required, Validators.pattern('^[0-9]+$')]),
      category: new FormControl(this.category, Validators.required),
      date: new FormControl(this.date, [Validators.required, Validators.pattern('^(1[0-2]|0[1-9])/(3[01]|[12][0-9]|0[1-9])/[0-9]{4}$')]),
      description: new FormControl(this.description)
    });
  }

}
