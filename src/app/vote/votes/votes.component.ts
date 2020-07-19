import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VotesService } from '../services/votes.service';

import { VoteSummary } from './interfaces/voteSummary';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-votes',
  templateUrl: './votes.component.html',
  styleUrls: ['./votes.component.css'],
})
export class VotesComponent implements OnInit, OnDestroy {
  voteSummary: VoteSummary;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private votesService: VotesService
  ) {
    this.route.data
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(({ votes }) => {
        this.voteSummary = votes;

        if (!this.voteSummary.lastEvaluatedKey) {
          this.voteSummary.moreVotesAvailable = false;
        } else {
          this.voteSummary.moreVotesAvailable = true;
        }

        votesService.saveVotes(this.voteSummary);
      });
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  moreVotes() {
    this.votesService
      .getAllVotesLastKey(
        this.voteSummary.lastEvaluatedKey.rollID,
        this.voteSummary.lastEvaluatedKey.votedAt
      )
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((votes) => {
        votes.votes.forEach((vote) => {
          this.voteSummary.votes.push(vote);
        });

        this.voteSummary.lastEvaluatedKey = votes.lastEvaluatedKey;

        if (!votes.lastEvaluatedKey) {
          this.voteSummary.moreVotesAvailable = false;
        } else {
          this.voteSummary.moreVotesAvailable = true;
        }

        this.votesService.saveVotes(this.voteSummary);
      });
  }

  getDetailLink(rollID: string) {
    return `/votes/vote/rollID/${rollID}`;
  }

  getVoteColor = (vote: string) => {
    switch (vote) {
      case 'Yea':
        return 'text-success';
      case 'Nay':
        return 'text-danger';
      default:
        return 'text-secondary';
    }
  };
}
