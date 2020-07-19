import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { CommitteesService } from './committees.service';
import { CommitteeDetail } from '../interfaces/committeeDetail';
import { Following } from '../../interfaces/following';
import { EMPTY, forkJoin } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CommitteeDetailResolverService
  implements Resolve<[CommitteeDetail, Following]> {

  constructor(
    private committeesService: CommitteesService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot) {
    const { committeeID } = route.params;

    const request1 = this.committeesService
      .getCommitteeDetail(committeeID)
      .pipe(
        catchError((err) => {
          console.error(err);
          this.router.navigateByUrl('/pageNotFound');

          return EMPTY;
        })
      );

    const request2 = this.committeesService
      .findFollowingCommittee(committeeID)
      .pipe(
        catchError(() => {
          return EMPTY;
        })
      );

    return forkJoin([request1, request2]);
  }
}
