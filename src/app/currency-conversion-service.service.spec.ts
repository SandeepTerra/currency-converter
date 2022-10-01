import { TestBed } from '@angular/core/testing';

import { CurrencyConversionServiceService } from './currency-conversion-service.service';

describe('CurrencyConversionServiceService', () => {
  let service: CurrencyConversionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrencyConversionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
