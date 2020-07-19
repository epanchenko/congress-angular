import { TestBed } from '@angular/core/testing';

import { CommitteesResolverService } from './committees-resolver.service';

describe('CommitteesResolverService', () => {
  let service: CommitteesResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommitteesResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
