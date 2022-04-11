import { Component, Input, OnInit, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Record } from 'src/app/models/record';
import { RecordService } from 'src/app/services/record.service';

const RECORDS: Record[] = [
  {
    type: "Expenses",
    amount: 456,
    category: "Food",
    description: "family gathering",
    shared: true,
    date: "09/10/2021"
  },
  {
    type: "Income",
    amount: 2400,
    category: "Salary",
    description: "",
    shared: false,
    date: "09/30/2021"
  },

];

function search(text: string, pipe: PipeTransform): Record[] {
  return RECORDS.filter(record => {
    const term = text.toLowerCase();
    let checkShared = record.shared ? "Yes" : "No";
    return record.type.toLowerCase().includes(term)
      || record.description.toLowerCase().includes(term)
      || record.category.toLowerCase().includes(term)
      || record.date.toLowerCase().includes(term)
      || checkShared.toLowerCase().includes(term)
      || pipe.transform(record.amount).includes(term);
  });
}

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
  type!: string;

  @Input()
  categories!: string[];

  currentMonth = new Date().getMonth();

  monthsArray: String[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  months = this.monthsArray.filter((e, index) => {
    return index <= this.currentMonth
  });

  records$: Observable<Record[]>;
  filter = new FormControl('');

  constructor(pipe: DecimalPipe, private recordService: RecordService) {
    this.records$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => search(text, pipe))
    );
  }

  passRecord(record:Record) {
    this.recordService.currentRecord.next(record);
    console.log("record",record)
  }

  ngOnInit(): void {
    //get all transactions of this type (calling service)
  }

  delete(description:string){
    if(confirm("Are you sure to delete this?")) {
      // send DELETE REQUEST including transactionId and userId
      // if success , remove from the var array 
      console.log(description)
    }
  }

}
