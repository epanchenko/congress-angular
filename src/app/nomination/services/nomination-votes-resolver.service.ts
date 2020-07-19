import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { VotesService } from '../../vote/services/votes.service';
import { BillVotes } from '../../bill/interfaces/billVotes';
import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NominationVotesResolverService implements Resolve<BillVotes> {
  constructor(private votesService: VotesService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot) {
    const { nominationID } = route.params;

    return this.votesService.getNominationVotes(nominationID).pipe(
      catchError((err) => {
        console.error(err);
        this.router.navigateByUrl('/pageNotFound');

        return EMPTY;
      })
    );
  }
}
