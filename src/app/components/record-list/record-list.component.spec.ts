import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { RecordListComponent } from './record-list.component';

describe('RecordListComponent', () => {
  let component: RecordListComponent;
  let fixture: ComponentFixture<RecordListComponent>;
  let serviceStub:any;


  beforeEach(async () => {

    serviceStub = {
      getAllTransactionsByType: () => of([{id:1,amount:900,categoryname:"housing", date:"01/01/2022", description:"testing", shared:true, categoryType:"expenses" }])
    }
    await TestBed.configureTestingModule({
      declarations: [ RecordListComponent ],
      // providers: [{provide: TransactionService, useValue:serviceStub}]
      imports:[HttpClientModule, RouterTestingModule],

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  // it('should return an array of list from an observable', ()=>{
  //   component.
  // })
});
