import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import {
  Router,
  NavigationStart,
  Event as NavigationEvent,
} from '@angular/router';
import { VotesService } from '../../vote/services/votes.service';
import { BillVotes } from '../interfaces/billVotes';
import { EMPTY } from 'rxjs';
import { catchError, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BillVotesResolverService implements Resolve<BillVotes> {
  loadSavedVotes = false;

  constructor(private votesService: VotesService, private router: Router) {
    router.events
      .pipe(
        filter((event: NavigationEvent) => {
          return event instanceof NavigationStart;
        })
      )
      .subscribe((event: NavigationStart) => {
        if (event.restoredState) {
          this.loadSavedVotes = true;
        } else {
          this.loadSavedVotes = false;
        }
      });
  }

  resolve(route: ActivatedRouteSnapshot) {
    const { billID } = route.params;

    if (!this.loadSavedVotes) {
      return this.votesService.getBillVotes(billID).pipe(
        catchError((err) => {
          console.error(err);
          this.router.navigateByUrl('/pageNotFound');

          return EMPTY;
        })
      );
    } else {
      return this.votesService.getBillVotesSaved().pipe(
        catchError((err) => {
          console.error(err);
          this.router.navigateByUrl('/pageNotFound');

          return EMPTY;
        })
      );
    }
  }
}
