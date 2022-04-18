import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { TransactionsService } from 'src/app/services/transactions.service';
import { Record } from 'src/app/models/record';

import { PartnerPageComponent } from './partner-page.component';

describe('PartnerPageComponent', () => {
  let component: PartnerPageComponent;
  let fixture: ComponentFixture<PartnerPageComponent>;
  let mockTransactionsService: any;
  let RECORDS: Record[];


  beforeEach(async () => {
    mockTransactionsService = jasmine.createSpyObj(['getAllTransactions']);

    await TestBed.configureTestingModule({
      declarations: [PartnerPageComponent],
      providers: [
        { provide: TransactionsService, useValue: mockTransactionsService }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    RECORDS = [
      {
        "id": 7,
        "amount": 2300.67,
        "date": "03/11/2022",
        "description": "Bi Weekly Salary",
        "categoryname": "salary",
        "categoryType": "income",
        "shared": false
      },
      {
        "id": 8,
        "amount": 2300.67,
        "date": "03/25/2022",
        "description": "Bi Weekly Salary",
        "categoryname": "salary",
        "categoryType": "income",
        "shared": false
      },
    ];
    fixture = TestBed.createComponent(PartnerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {

    let store: { [x: string]: any; };
    const mockLocalStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      }
    };
    spyOn(localStorage, 'getItem')
      .and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem')
      .and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem')
      .and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear')
      .and.callFake(mockLocalStorage.clear);
  });

  it('should return stored first name from localStorage', () => {
    localStorage.setItem('user_info', "{id:1, spouseFirstName:'Emma'}");
    expect(component.getSpouseName()).toEqual('Emma');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set records correctly from the service', () => {
    mockTransactionsService.getAllTransactions.and.returnValue(of(RECORDS))
    fixture.detectChanges();
    expect(component.records.length).toBe(2);
  });

});
