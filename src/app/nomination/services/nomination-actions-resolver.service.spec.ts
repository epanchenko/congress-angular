import { TestBed } from '@angular/core/testing';

import { NominationActionsResolverService } from './nomination-actions-resolver.service';

describe('NominationActionsResolverService', () => {
  let service: NominationActionsResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NominationActionsResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
