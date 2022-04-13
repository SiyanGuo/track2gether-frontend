import { Component, Input, OnInit, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Record } from 'src/app/models/record';
import { RecordService } from 'src/app/services/record.service';
import { TransactionsService } from 'src/app/services/transactions.service';

@Component({
  selector: 'app-record-list',
  templateUrl: './record-list.component.html',
  styleUrls: ['./record-list.component.css'],
  providers: [DecimalPipe]
})
export class RecordListComponent implements OnInit {
  faPencil = faPencil;
  faTrashCan = faTrashCan;

  @Input()
  typeId!: number;

  @Input()
  categories!: string[];

  records!: Record[];

  currentMonth = new Date().getMonth();

  monthsArray: String[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  months = this.monthsArray.filter((e, index) => {
    return index <= this.currentMonth
  });

  records$: Observable<Record[]>;
  filter = new FormControl('');

  constructor(pipe: DecimalPipe, private recordService: RecordService, private transactionService: TransactionsService) {
    this.records$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => this.search(text, pipe))
    );
  }

  passRecord(record: Record) {
    this.recordService.currentRecord.next(record);
  }

  search(text: string, pipe: PipeTransform): Record[] {
    return (this.records || []).filter(record => {
      const term = text.toLowerCase();
      let checkShared = record.shared ? "Yes" : "No";
      return record.categoryType.toLowerCase().includes(term)
        || record.description.toLowerCase().includes(term)
        || record.categoryname.toLowerCase().includes(term)
        || record.date.toLowerCase().includes(term)
        || checkShared.toLowerCase().includes(term)
        || pipe.transform(record.amount).includes(term);
    });
  }

  ngOnInit(): void {

    // if (this.type === "income") {

    //   this.transactionService.getAllTransactionsByType(1);
    //   this.transactionService.newTransactionList.subscribe(data =>{
    //     this.records = data;
    //   });
    //   // this.records$ = of(this.records);      
    // };

    this.transactionService.getAllTransactionsByType(this.typeId);

    this.transactionService.newTransactionList.subscribe(data => {
      this.records = data;
    });;

  }

}
