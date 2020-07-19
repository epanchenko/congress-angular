import { TestBed } from '@angular/core/testing';

import { BillActionsResolverService } from './bill-actions-resolver.service';

describe('BillActionsResolverService', () => {
  let service: BillActionsResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BillActionsResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
