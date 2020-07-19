import { TestBed } from '@angular/core/testing';

import { FollowingNominationsResolverService } from './following-nominations-resolver.service';

describe('FollowingNominationsResolverService', () => {
  let service: FollowingNominationsResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FollowingNominationsResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
