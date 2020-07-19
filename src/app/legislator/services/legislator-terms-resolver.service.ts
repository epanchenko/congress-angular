import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { LegislatorService } from './legislator.service';
import { LegislatorTerms } from '../interfaces/legislatorTerms';
import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LegislatorTermsResolverService
  implements Resolve<LegislatorTerms> {
  constructor(
    private legislatorService: LegislatorService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot) {
    const { id } = route.params;

    return this.legislatorService.getLegislatorTerms(id).pipe(
      catchError((err) => {
        console.error(err);
        this.router.navigateByUrl('/pageNotFound');

        return EMPTY;
      })
    );
  }
}
