import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import {
  Router,
  NavigationStart,
  Event as NavigationEvent,
} from '@angular/router';
import { VoteSummary } from '../../vote/votes/interfaces/voteSummary';
import { VotesService } from '../../vote/services/votes.service';
import { EMPTY } from 'rxjs';
import { catchError, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LegislatorVotesResolverService implements Resolve<VoteSummary> {
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
    const { id } = route.params;

    if (!this.loadSavedVotes) {
      return this.votesService.getLegislatorVotes(id).pipe(
        catchError((err) => {
          console.error(err);
          this.router.navigateByUrl('/pageNotFound');

          return EMPTY;
        })
      );
    } else {
      return this.votesService.getLegislatorVotesSaved().pipe(
        catchError((err) => {
          console.error(err);
          this.router.navigateByUrl('/pageNotFound');

          return EMPTY;
        })
      );
    }
  }
}
