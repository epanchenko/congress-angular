import { TestBed } from '@angular/core/testing';

import { BillCommitteesResolverService } from './bill-committees-resolver.service';

describe('BillCommitteesResolverService', () => {
  let service: BillCommitteesResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BillCommitteesResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
