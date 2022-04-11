import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Record } from '../models/record';
@Injectable({
  providedIn: 'root'
})
export class RecordService {
  
  currentRecord:Subject<Record> = new Subject<Record>();
  constructor() { }
}
