import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { NominationsService } from './nominations.service';
import { NominationDetail } from '../interfaces/nominationDetail';
import { Following } from '../../interfaces/following';
import { EMPTY, forkJoin } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NominationDetailResolverService
  implements Resolve<[NominationDetail, Following]> {
  constructor(
    private nominationService: NominationsService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot) {
    const { nominationID } = route.params;

    const request1 = this.nominationService
      .getNominationDetail(nominationID)
      .pipe(
        catchError((err) => {
          console.error(err);
          this.router.navigateByUrl('/pageNotFound');

          return EMPTY;
        })
      );

    const request2 = this.nominationService
      .findFollowingNomination(nominationID)
      .pipe(
        catchError(() => {
          return EMPTY;
        })
      );

    return forkJoin([request1, request2]);
  }
}
