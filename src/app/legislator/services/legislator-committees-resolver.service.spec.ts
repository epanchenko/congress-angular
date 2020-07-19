import { TestBed } from '@angular/core/testing';

import { LegislatorCommitteesResolverService } from './legislator-committees-resolver.service';

describe('LegislatorCommitteesResolverService', () => {
  let service: LegislatorCommitteesResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LegislatorCommitteesResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
