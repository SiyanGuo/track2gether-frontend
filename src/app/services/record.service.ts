import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Record } from '../models/record';
@Injectable({
  providedIn: 'root'
})
export class RecordService {
  
  currentRecord:Subject<Record> = new Subject<Record>();
  addedRecord:Subject<Record> = new Subject<Record>();
  updatedRecord:Subject<Record> = new Subject<Record>();
  deletedRecord:Subject<number> = new Subject<number>();
  constructor() { }
}
