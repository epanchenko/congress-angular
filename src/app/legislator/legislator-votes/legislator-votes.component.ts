import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VotesService } from '../../vote/services/votes.service';

import { VoteSummary } from '../../vote/votes/interfaces/voteSummary';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { getVoteColor } from '../../utils/utils';

@Component({
  selector: 'app-legislator-votes',
  templateUrl: './legislator-votes.component.html',
  styleUrls: ['./legislator-votes.component.css'],
})
export class LegislatorVotesComponent implements OnInit, OnDestroy {
  voteSummary: VoteSummary;
  bioguideID: string;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private votesService: VotesService
  ) {
    this.bioguideID = this.route.snapshot.params.id;

    this.route.data
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(({ votes }) => {
        this.voteSummary = votes;

        if (!this.voteSummary.lastEvaluatedKey) {
          this.voteSummary.moreVotesAvailable = false;
        } else {
          this.voteSummary.moreVotesAvailable = true;
        }

        votesService.saveLegislatorVotes(this.voteSummary);
      });
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getVoteColor(val: any): string {
    return getVoteColor(val);
  }

  moreVotes() {
    this.votesService
      .getLegislatorVotesLastEvalKey(
        this.bioguideID,
        this.voteSummary.lastEvaluatedKey.rollID,
        this.voteSummary.lastEvaluatedKey.votedAt
      )
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((votes) => {
        votes.data.votes.forEach((vote) => {
          this.voteSummary.votes.push(vote);
        });

        this.voteSummary.lastEvaluatedKey = votes.data.lastEvaluatedKey;

        if (!this.voteSummary.lastEvaluatedKey) {
          this.voteSummary.moreVotesAvailable = false;
        } else {
          this.voteSummary.moreVotesAvailable = true;
        }
        this.votesService.saveLegislatorVotes(this.voteSummary);
      });
  }

  getDetailLink(rollID: string) {
    return `/votes/vote/rollID/${rollID}`;
  }
}
