import { TestBed } from '@angular/core/testing';

import { LegislatorVotesResolverService } from './legislator-votes-resolver.service';

describe('LegislatorVotesResolverService', () => {
  let service: LegislatorVotesResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LegislatorVotesResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
