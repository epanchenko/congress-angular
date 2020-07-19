import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { CommitteesService } from './committees.service';
import { CommitteesDetail } from '../interfaces/committeesDetail';
import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CommitteeSubcommitteesResolverService
  implements Resolve<CommitteesDetail> {
  constructor(
    private committeesService: CommitteesService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot) {
    const { committeeID } = route.params;

    return this.committeesService.getSubcommittees(committeeID).pipe(
      catchError((err) => {
        console.error(err);
        this.router.navigateByUrl('/pageNotFound');

        return EMPTY;
      })
    );
  }
}
