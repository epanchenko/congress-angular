import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Nomination } from '../interfaces/nomination';
import { NominationAction } from '../interfaces/nominationAction';
import { months } from '../../utils/utils';
import { Subscription } from 'rxjs';
import { VotesService } from 'src/app/vote/services/votes.service';
import { AuthService } from 'src/app/services/auth.service';
import { NominationsService } from '../services/nominations.service';

@Component({
  selector: 'app-nomination-detail',
  templateUrl: './nomination-detail.component.html',
  styleUrls: ['./nomination-detail.component.css'],
})
export class NominationDetailComponent implements OnInit, OnDestroy {
  nomination: Nomination;
  lastAction: NominationAction;
  nomination$: Subscription;
  votesAvailable = false;
  followText = '';

  constructor(
    private route: ActivatedRoute,
    private votesService: VotesService,
    public authService: AuthService,
    private nominationsService: NominationsService
  ) {
    this.nomination$ = this.route.data.subscribe(({ nomination }) => {
      this.nomination = nomination[0].nomination;

      if (this.nomination.actions.length > 0) {
        this.lastAction = this.nomination.actions[0];
      }

      if (nomination[1]) {
        this.nomination.following = nomination[1].status === 'found';
        this.followText = this.nomination.following ? 'Unfollow' : 'Follow';
      }

      this.votesService
        .getNominationVotes(this.nomination.nominationID)
        .subscribe((votes) => {
          if (votes.votes.length > 0) {
            this.votesAvailable = true;
          } else {
            this.votesAvailable = false;
          }
        });
    });
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.nomination$.unsubscribe();
  }

  getDate(votedAt: string) {
    const date = new Date(votedAt.substring(0, 10) + 'T20:00:00');
    return `${
      months[date.getMonth()]
    } ${date.getDate()}, ${date.getFullYear()}`;
  }

  follow() {
    if (!this.nomination.following) {
      this.nominationsService
        .createFollowingNomination(this.nomination.nominationID)
        .subscribe(() => {
          this.nomination.following = true;
          this.followText = 'Unfollow';
        });
    } else {
      this.nominationsService
        .deleteFollowingNomination(this.nomination.nominationID)
        .subscribe(() => {
          this.nomination.following = false;
          this.followText = 'Follow';
        });
    }
  }
}
