import { TestBed } from '@angular/core/testing';

import { LegislatorDetailResolverService } from './legislator-detail-resolver.service';

describe('LegislatorDetailResolverService', () => {
  let service: LegislatorDetailResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LegislatorDetailResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
