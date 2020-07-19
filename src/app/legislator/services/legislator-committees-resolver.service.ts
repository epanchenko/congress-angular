import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { LegislatorService } from './legislator.service';
import { CommitteesDetail } from '../../committee/interfaces/committeesDetail';
import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LegislatorCommitteesResolverService
  implements Resolve<CommitteesDetail> {
  constructor(
    private legislatorService: LegislatorService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot) {
    const { bioguideID } = route.params;

    return this.legislatorService.getCommittees(bioguideID).pipe(
      catchError((err) => {
        console.error(err);
        this.router.navigateByUrl('/pageNotFound');

        return EMPTY;
      })
    );
  }
}
