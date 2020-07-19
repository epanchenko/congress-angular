import { TestBed } from '@angular/core/testing';

import { CommitteeDetailResolverService } from './committee-detail-resolver.service';

describe('CommitteeDetailResolverService', () => {
  let service: CommitteeDetailResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommitteeDetailResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
