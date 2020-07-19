import { TestBed } from '@angular/core/testing';

import { LegislatorService } from './legislator.service';

describe('LegislatorService', () => {
  let service: LegislatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LegislatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
