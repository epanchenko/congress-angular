import { TestBed } from '@angular/core/testing';

import { NominationDetailResolverService } from './nomination-detail-resolver.service';

describe('NominationDetailResolverService', () => {
  let service: NominationDetailResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NominationDetailResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
