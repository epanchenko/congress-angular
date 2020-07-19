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

@Component({
  selector: 'app-vote-detail',
  templateUrl: './vote-detail.component.html',
  styleUrls: ['./vote-detail.component.css'],
})
export class VoteDetailComponent implements OnInit, OnDestroy {
  totalVotes: number[];
  democraticVotes: number[];
  republicanVotes: number[];
  independentVotes: number[];
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
    this.republicanVotes = [];
    this.democraticVotes = [];
    this.independentVotes = [];
    this.individualVotes = [];

    /*this.voteColors = [
      {
        backgroundColor: [
          'rgba(0, 148, 97, 1)',
          'rgba(244, 4, 4, 1)',
          'rgba(170, 170, 170, 1)',
          'rgba(135, 206, 235, 1)',
        ],
      },
    ];*/

    this.votes$ = this.route.data.subscribe(({ vote }) => {
      this.democraticVotes = vote.voteDetail.democraticVotes.split('@');
      this.republicanVotes = vote.voteDetail.republicanVotes.split('@');
      this.independentVotes = vote.voteDetail.independentVotes.split('@');

      if (vote.voteDetail.billID !== '') {
        this.billID = vote.voteDetail.billID;
      } else {
        this.nominationID = vote.voteDetail.nominationID;
      }

      vote.voteDetail.individualVotes.forEach((individual) => {
        const ind = individual.split('@');
        const name = ind[1].split(' ');

        this.individualVotes.push({
          lastName: name[name.length - 1],
          firstName: name[0],
          party: ind[2],
          state: ind[3],
          district: ind.length === 6 ? ind[5] : '',
          vote: ind[4],
        });
      });

      this.individualVotes.sort(fieldSorter(['lastName', 'firstName']));

      this.individualVotes$ = this.filter.valueChanges.pipe(
        startWith(''),
        map((text) => this.search(text))
      );

      for (let i = 0; i < 4; i++) {
        this.totalVotes[i] =
          +this.democraticVotes[i] +
          +this.republicanVotes[i] +
          +this.independentVotes[i];
      }
    });
  }

  districtString(district: string) {
    if (district === '') {
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
