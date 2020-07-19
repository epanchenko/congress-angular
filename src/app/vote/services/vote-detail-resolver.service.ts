import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

import { VotesService } from './votes.service';
import { VoteDetail } from '../votes/interfaces/voteDetail';

@Injectable({
  providedIn: 'root',
})
export class VoteDetailResolverService implements Resolve<VoteDetail> {
  constructor(private votesService: VotesService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot) {
    const { rollID } = route.params;

    return this.votesService.getVoteDetail(rollID).pipe(
      catchError((err) => {
        console.error(err);
        this.router.navigateByUrl('/pageNotFound');

        return EMPTY;
      })
    );
  }
}
