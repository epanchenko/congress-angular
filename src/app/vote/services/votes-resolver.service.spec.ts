import { TestBed } from '@angular/core/testing';

import { VotesResolverService } from './votes-resolver.service';

describe('VotesResolverService', () => {
  let service: VotesResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VotesResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
