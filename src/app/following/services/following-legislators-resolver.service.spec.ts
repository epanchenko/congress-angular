import { TestBed } from '@angular/core/testing';

import { FollowingLegislatorsResolverService } from './following-legislators-resolver.service';

describe('FollowingLegislatorsResolverService', () => {
  let service: FollowingLegislatorsResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FollowingLegislatorsResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
