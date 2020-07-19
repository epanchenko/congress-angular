import { TestBed } from '@angular/core/testing';

import { CommitteeSubcommitteesResolverService } from './committee-subcommittees-resolver.service';

describe('CommitteeSubcommitteesResolverService', () => {
  let service: CommitteeSubcommitteesResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommitteeSubcommitteesResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
