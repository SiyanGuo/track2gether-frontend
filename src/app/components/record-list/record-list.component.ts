// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-record-list',
//   templateUrl: './record-list.component.html',
//   styleUrls: ['./record-list.component.css']
// })
// export class RecordListComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }
import { Component, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { faPencil, faTrashCan}  from '@fortawesome/free-solid-svg-icons';

interface Record {
  amount: number,
  category: string,
  date: string,
  description: string,
  shared: boolean,
  type: string
}

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
    let checkShared = record.shared? "Yes" :"No";
    return record.type.toLowerCase().includes(term)
      || record.description.toLowerCase().includes(term)
      || record.category.toLowerCase().includes(term)
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
export class RecordListComponent {
  faPencil = faPencil;
  faTrashCan = faTrashCan;

  records$: Observable<Record[]>;
  filter = new FormControl('');

  constructor(pipe: DecimalPipe) {
    this.records$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => search(text, pipe))
    );
  }
}
