import { TestBed } from '@angular/core/testing';

import { NominationVotesResolverService } from './nomination-votes-resolver.service';

describe('NominationVotesResolverService', () => {
  let service: NominationVotesResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NominationVotesResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
