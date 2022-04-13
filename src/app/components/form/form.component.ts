import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Record } from 'src/app/models/record';
import { Category } from 'src/app/models/transaction-category';
import { RecordService } from 'src/app/services/record.service';
import { TransactionsService } from 'src/app/services/transactions.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  @Input()
  typeId!: number;
  user = JSON.parse(localStorage.getItem("user_info") || "");
  userId = this.user.id;
  spouseId=this.user.spouseId;

  categories!: string[];

  form!: FormGroup;
  amount!: number;
  categoryname!: string;
  date!: string;
  description!: string;
  shared = false;
  categoryList!: Category[];
  categoryId!: number;
  currentRecord!: Record;
  isAdd = true;

  object!:any;

  updateRecord() {
    this.isAdd = false;
    this.form = this.formBuilder.group({
      amount: new FormControl(this.currentRecord.amount, [Validators.required, Validators.pattern('^[0-9]+$')]),
      categoryname: new FormControl(this.currentRecord.categoryname, Validators.required),
      date: new FormControl(this.currentRecord.date, [Validators.required, Validators.pattern('^(1[0-2]|0[1-9])/(3[01]|[12][0-9]|0[1-9])/[0-9]{4}$')]),
      description: new FormControl(this.currentRecord.description),
      shared: new FormControl(this.currentRecord.shared)
    });
  }

  constructor(private formBuilder: FormBuilder, private recordService: RecordService, private transactionService: TransactionsService) { }


  sendTransaction(formValue: Record) {

    if (this.form.valid) {

      this.object = this.categoryList.find(obj => obj.categoryname === formValue.categoryname)
      this.categoryId = this.object.id;

      if (this.isAdd) {
        if (formValue.shared) {
          formValue.amount /= 2;
          this.transactionService.addTransaction(this.userId, formValue.amount, this.categoryId, formValue.date, formValue.description, formValue.shared)
          .subscribe( (res:any) => this.transactionService.getAllTransactionsByType(this.typeId));
          this.transactionService.addTransaction(this.spouseId, formValue.amount, this.categoryId, formValue.date, formValue.description, formValue.shared)
          .subscribe((res:any) => this.transactionService.getAllTransactionsByType(this.typeId));
        } else {
          formValue.amount = + formValue.amount;
          this.transactionService.addTransaction(this.userId, formValue.amount, this.categoryId, formValue.date, formValue.description, formValue.shared)
          .subscribe((res:any) => this.transactionService.getAllTransactionsByType(this.typeId));
        }
      } else {
        if (formValue.shared) {
          formValue.amount /= 2;
          this.transactionService.updateTransaction(this.userId, this.currentRecord.id, formValue.amount, this.categoryId, formValue.date, formValue.description, formValue.shared)
          .subscribe((res:any) => this.transactionService.getAllTransactionsByType(this.typeId));
          this.transactionService.updateTransaction(this.userId, this.currentRecord.id, formValue.amount, this.categoryId, formValue.date, formValue.description, formValue.shared)
          .subscribe((res:any) => this.transactionService.getAllTransactionsByType(this.typeId));
        } else {
          formValue.amount = + formValue.amount;
          this.transactionService.updateTransaction(this.userId, this.currentRecord.id, formValue.amount, this.categoryId, formValue.date, formValue.description, formValue.shared)
          .subscribe((res:any) => this.transactionService.getAllTransactionsByType(this.typeId));
        }
        this.isAdd = true;
      }
      this.form.reset();
    }
  }

  ngOnInit(): void {

    this.recordService.currentRecord.subscribe(data => {
      this.currentRecord = data;
      this.updateRecord();
    })

    this.form = this.formBuilder.group({
      amount: new FormControl(this.amount, [Validators.required, Validators.pattern('^[0-9]+$')]),
      categoryname: new FormControl(this.categoryname, Validators.required),
      date: new FormControl(this.date, [Validators.required, Validators.pattern('^(1[0-2]|0[1-9])/(3[01]|[12][0-9]|0[1-9])/[0-9]{4}$')]),
      description: new FormControl(this.description),
      shared: new FormControl(this.shared)
    });

    // if (this.type === "income") {
    //   this.transactionService.getCategories(1).subscribe(data => {
    //     this.categoryList = data;
    //     this.categories = this.categoryList.map(each => {
    //       return each.categoryname
    //     })
    //   })
    // }

    this.transactionService.getCategories(this.typeId).subscribe(data => {
      this.categoryList = data;
      this.categories = this.categoryList.map(each => {
        return each.categoryname
      })
    })

  }
}
