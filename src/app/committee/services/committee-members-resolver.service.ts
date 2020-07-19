import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { CommitteesService } from './committees.service';
import { CommitteeMemberDetail } from '../interfaces/committeeMemberDetail';

import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CommitteeMembersResolverService
  implements Resolve<CommitteeMemberDetail> {
  constructor(
    private committeesService: CommitteesService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot) {
    const { committeeID } = route.params;

    return this.committeesService.getMembers(committeeID).pipe(
      catchError(() => {
        this.router.navigateByUrl('/pageNotFound');
        return EMPTY;
      })
    );
  }
}
