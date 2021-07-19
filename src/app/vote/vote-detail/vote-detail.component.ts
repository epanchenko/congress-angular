import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';

import { fieldSorter } from '../../utils/utils';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { getVoteColor } from '../../utils/utils';

interface LegislatorVoteDetail {
  lastName: string;
  firstName: string;
  party: string;
  state: string;
  district: string;
  vote: string;
}

interface PartyVoteDetail {
  Yea: number;
  Nay: number;
  NotVoting: number;
  Present: number;
}

@Component({
  selector: 'app-vote-detail',
  templateUrl: './vote-detail.component.html',
  styleUrls: ['./vote-detail.component.css'],
})
export class VoteDetailComponent implements OnInit, OnDestroy {
  totalVotes: number[];
  democraticVotes: PartyVoteDetail;
  republicanVotes: PartyVoteDetail;
  independentVotes: PartyVoteDetail;
  individualVotes: LegislatorVoteDetail[];
  individualVotes$: Observable<LegislatorVoteDetail[]>;
  totalLabels = ['Yes', 'No', 'No Vote', 'Present'];
  voteColors;
  billID: string;
  nominationID: string;
  filter = new FormControl('');
  votes$: Subscription;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.totalVotes = [];
    this.individualVotes = [];

    this.votes$ = this.route.data.subscribe(({ vote }) => {
      this.democraticVotes = vote.voteDetail.democraticVotes;
      this.republicanVotes = vote.voteDetail.republicanVotes;
      this.independentVotes = vote.voteDetail.independentVotes;

      if (vote.voteDetail.billID !== '') {
        this.billID = vote.voteDetail.billID;
      } else {
        this.nominationID = vote.voteDetail.nominationID;
      }

      vote.voteDetail.individualVotes.forEach((individual) => {
        this.individualVotes.push({
          lastName: individual.lastName,
          firstName: individual.firstName,
          party: individual.party,
          state: individual.state,
          district: individual.district === '@' ? '' : individual.district,
          vote: individual.vote,
        });
      });

      this.individualVotes.sort(fieldSorter(['lastName', 'firstName']));

      this.individualVotes$ = this.filter.valueChanges.pipe(
        startWith(''),
        map((text) => this.search(text))
      );

      /*for (let i = 0; i < 4; i++) {
        this.totalVotes[i] =
          +this.democraticVotes[i] +
          +this.republicanVotes[i] +
          +this.independentVotes[i];
      }*/

      this.totalVotes[0] =
        this.democraticVotes.Yea +
        this.republicanVotes.Yea +
        this.independentVotes.Yea;
      this.totalVotes[1] =
        this.democraticVotes.Nay +
        this.republicanVotes.Nay +
        this.independentVotes.Nay;
      this.totalVotes[2] =
        this.democraticVotes.NotVoting +
        this.republicanVotes.NotVoting +
        this.independentVotes.NotVoting;
      this.totalVotes[3] =
        this.democraticVotes.Present +
        this.republicanVotes.Present +
        this.independentVotes.Present;
    });
  }

  districtString(district: string) {
    if (district === '@') {
      return '';
    } else {
      return `- District ${district}`;
    }
  }

  getVoteString(vote: string) {
    switch (vote) {
      case 'Y':
        return 'Yea';
      case 'N':
        return 'Nay';
      case 'X':
        return 'No Vote';
      default:
        return 'Present';
    }
  }

  search(text: string): LegislatorVoteDetail[] {
    return this.individualVotes.filter((voter) => {
      const term = text.toLowerCase();

      return voter.lastName.toLowerCase().includes(term);
    });
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.votes$.unsubscribe();
  }

  getVoteColor(val: any): string {
    return getVoteColor(val);
  }
}
