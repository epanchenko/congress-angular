import { TestBed } from '@angular/core/testing';

import { FollowingBillsResolverService } from './following-bills-resolver.service';

describe('FollowingBillsResolverService', () => {
  let service: FollowingBillsResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FollowingBillsResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
