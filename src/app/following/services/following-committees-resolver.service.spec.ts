import { TestBed } from '@angular/core/testing';

import { FollowingCommitteesResolverService } from './following-committees-resolver.service';

describe('FollowingCommitteesResolverService', () => {
  let service: FollowingCommitteesResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FollowingCommitteesResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
