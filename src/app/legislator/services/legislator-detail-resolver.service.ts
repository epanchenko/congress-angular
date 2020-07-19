import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { catchError, mergeMap } from 'rxjs/operators';
import { EMPTY, zip, of } from 'rxjs';

import { LegislatorDetail } from '../interfaces/legislatorDetail';
import { DistrictCoordinates } from '../interfaces/districtCoordinates';
import { LegislatorService } from './legislator.service';
import { Following } from '../../interfaces/following';

@Injectable({
  providedIn: 'root',
})
export class LegislatorDetailResolverService
  implements Resolve<[LegislatorDetail, DistrictCoordinates, Following]> {
  constructor(
    private legislatorService: LegislatorService,
    private router: Router
  ) {}

  errorFunction(err) {
    console.error(err);
    this.router.navigateByUrl('/pageNotFound');
    return EMPTY;
  }

  resolve(route: ActivatedRouteSnapshot) {
    const { id } = route.params;

    return this.legislatorService.getLegislatorRequest(id).pipe(
      mergeMap((result: LegislatorDetail) =>
        zip(
          of(result),

          this.legislatorService.getCoordinates(result.data.location).pipe(
            catchError((err) => {
              return this.errorFunction(err);
            })
          ),

          this.legislatorService.findFollowingLegislator(id).pipe(
            catchError(() => {
              return EMPTY;
            })
          )
        )
      ),
      catchError((err) => {
        return this.errorFunction(err);
      })
    );
  }
}
