import { TestBed } from '@angular/core/testing';

import { BillsDetailResolverService } from './bills-detail-resolver.service';

describe('BillsDetailResolverService', () => {
  let service: BillsDetailResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BillsDetailResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
