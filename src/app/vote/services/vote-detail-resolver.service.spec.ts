import { TestBed } from '@angular/core/testing';

import { VoteDetailResolverService } from './vote-detail-resolver.service';

describe('VoteDetailResolverService', () => {
  let service: VoteDetailResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VoteDetailResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
