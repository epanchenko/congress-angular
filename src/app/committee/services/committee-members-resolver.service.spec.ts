import { TestBed } from '@angular/core/testing';

import { CommitteeMembersResolverService } from './committee-members-resolver.service';

describe('CommitteeMembersResolverService', () => {
  let service: CommitteeMembersResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommitteeMembersResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
