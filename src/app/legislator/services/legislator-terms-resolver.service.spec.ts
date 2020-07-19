import { TestBed } from '@angular/core/testing';

import { LegislatorTermsResolverService } from './legislator-terms-resolver.service';

describe('LegislatorTermsResolverService', () => {
  let service: LegislatorTermsResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LegislatorTermsResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
