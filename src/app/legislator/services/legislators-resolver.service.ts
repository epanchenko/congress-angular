import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

import { LegislatorSummary } from '../../shared/interfaces/legislatorSummary';
import { LegislatorService } from './legislator.service';

@Injectable({
  providedIn: 'root',
})
export class LegislatorsResolverService
  implements Resolve<LegislatorSummary[]> {
  constructor(
    private legislatorService: LegislatorService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.legislatorService.getLegislatorsRequest().pipe(
      catchError(() => {
        this.router.navigateByUrl('/pageNotFound');
        return EMPTY;
      })
    );
  }
}
