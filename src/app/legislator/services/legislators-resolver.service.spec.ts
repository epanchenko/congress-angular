import { TestBed } from '@angular/core/testing';

import { LegislatorsResolverService } from './legislators-resolver.service';

describe('LegislatorsResolverService', () => {
  let service: LegislatorsResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LegislatorsResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
