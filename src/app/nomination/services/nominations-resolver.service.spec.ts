import { TestBed } from '@angular/core/testing';

import { NominationsResolverService } from './nominations-resolver.service';

describe('NominationsResolverService', () => {
  let service: NominationsResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NominationsResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
