import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Record } from 'src/app/models/record';
import { RecordService } from 'src/app/services/record.service';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  @Input()
  type!: string;

  @Input()
  categories!: string[];

  form!: FormGroup;
  amount!: number;
  category!: string;
  date!: string;
  description!: string;
  shared!: boolean;

  currentRecord!: Record;

  updateRecord() {
    this.form = this.formBuilder.group({
      amount: new FormControl(this.currentRecord.amount, [Validators.required, Validators.pattern('^[0-9]+$')]),
      category: new FormControl(this.currentRecord.category, Validators.required),
      date: new FormControl(this.currentRecord.date, [Validators.required, Validators.pattern('^(1[0-2]|0[1-9])/(3[01]|[12][0-9]|0[1-9])/[0-9]{4}$')]),
      description: new FormControl(this.currentRecord.description),
      shared: new FormControl(this.currentRecord.shared)
    });
  }


  constructor(private formBuilder: FormBuilder, private recordService: RecordService) { }


  addTransaction(formValue: Record) {

    if (this.form.valid) {

      console.log(formValue);

      if (formValue.shared) {
        formValue.amount /= 2;
        // get userId and spouseId, categoryId send two post requests
      } else {
        // get userId, categoryId and send this request
      }

    }
  }

  ngOnInit(): void {
    this.recordService.currentRecord.subscribe(data => {
      this.currentRecord = data;
      this.updateRecord();
    })

    this.form = this.formBuilder.group({
      amount: new FormControl(this.amount, [Validators.required, Validators.pattern('^[0-9]+$')]),
      category: new FormControl(this.category, Validators.required),
      date: new FormControl(this.date, [Validators.required, Validators.pattern('^(1[0-2]|0[1-9])/(3[01]|[12][0-9]|0[1-9])/[0-9]{4}$')]),
      description: new FormControl(this.description),
      shared: new FormControl(this.shared)
    });


  }

}
