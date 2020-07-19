import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VotesService } from '../../vote/services/votes.service';

import { BillVotes } from '../interfaces/billVotes';
import { months } from '../../utils/utils';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-bill-votes',
  templateUrl: './bill-votes.component.html',
  styleUrls: ['./bill-votes.component.css'],
})
export class BillVotesComponent implements OnInit, OnDestroy {
  billVotes: BillVotes;
  billID: string;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private votesService: VotesService
  ) {
    this.route.data
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(({ votes }) => {
        this.billVotes = votes;
        this.billID = this.route.snapshot.params.billID;

        if (!this.billVotes.lastEvaluatedKey) {
          this.billVotes.moreVotesAvailable = false;
        } else {
          this.billVotes.moreVotesAvailable = true;
        }

        votesService.saveBillVotes(this.billVotes);
      });
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  moreVotes() {
    this.votesService
      .getBillVotesLastEvalKey(
        this.billID,
        this.billVotes.lastEvaluatedKey.rollID,
        this.billVotes.lastEvaluatedKey.votedAt
      )
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((votes) => {
        votes.votes.forEach((vote) => {
          this.billVotes.votes.push(vote);
        });

        this.billVotes.lastEvaluatedKey = votes.lastEvaluatedKey;

        if (!votes.lastEvaluatedKey) {
          this.billVotes.moreVotesAvailable = false;
        } else {
          this.billVotes.moreVotesAvailable = true;
        }

        this.votesService.saveBillVotes(this.billVotes);
      });
  }

  getDetailLink(rollID: string) {
    return `/votes/vote/rollID/${rollID}`;
  }

  getDate(votedAt: string) {
    const date = new Date(votedAt.substring(0, 10) + 'T20:00:00');
    return `${
      months[date.getMonth()]
    } ${date.getDate()}, ${date.getFullYear()}`;
  }
}
