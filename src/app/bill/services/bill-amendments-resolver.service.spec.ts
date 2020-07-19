import { TestBed } from '@angular/core/testing';

import { BillAmendmentsResolverService } from './bill-amendments-resolver.service';

describe('BillAmendmentsResolverService', () => {
  let service: BillAmendmentsResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BillAmendmentsResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
