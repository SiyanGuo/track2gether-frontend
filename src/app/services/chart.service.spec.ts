import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { ChartService } from './chart.service';

describe('ChartService', () => {
  let service: ChartService;

  beforeEach( async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientModule],
    });
    service = TestBed.inject(ChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
