import { TestBed } from '@angular/core/testing';

import { BillVotesResolverService } from './bill-votes-resolver.service';

describe('BillVotesResolverService', () => {
  let service: BillVotesResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BillVotesResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
