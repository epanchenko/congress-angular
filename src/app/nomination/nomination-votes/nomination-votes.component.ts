import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { VotesService } from '../../vote/services/votes.service';
import { BillVotes } from '../../bill/interfaces/billVotes';
import { months } from '../../utils/utils';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nomination-votes',
  templateUrl: './nomination-votes.component.html',
  styleUrls: ['./nomination-votes.component.css'],
})
export class NominationVotesComponent implements OnInit, OnDestroy {
  nominationVotes: BillVotes;
  description: string;
  votes$: Subscription;

  constructor(private route: ActivatedRoute) {
    this.votes$ = this.route.data.subscribe(({ votes }) => {
      this.nominationVotes = votes.votes;
      this.description = this.nominationVotes[0].billTitle;
    });
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.votes$.unsubscribe();
  }

  getDate(votedAt: string) {
    const date = new Date(votedAt.substring(0, 10) + 'T20:00:00');
    return `${
      months[date.getMonth()]
    } ${date.getDate()}, ${date.getFullYear()}`;
  }
}
