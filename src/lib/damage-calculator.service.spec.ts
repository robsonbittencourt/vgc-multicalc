import { TestBed } from '@angular/core/testing';

import { DamageCalculatorService } from './damage-calculator.service';

describe('DamageCalculatorService', () => {
  let service: DamageCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DamageCalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
