import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { CommitteeMemberDetail } from '../interfaces/committeeMemberDetail';
import { LegislatorSummary } from '../../shared/interfaces/legislatorSummary';

import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-committee-members',
  templateUrl: './committee-members.component.html',
  styleUrls: ['./committee-members.component.css'],
})
export class CommitteeMembersComponent implements OnInit, OnDestroy {
  committee: CommitteeMemberDetail;
  committeeName: string;

  legislators$: Observable<LegislatorSummary[]>;
  filter = new FormControl('');
  members$: Subscription;

  constructor(private route: ActivatedRoute) {
    this.members$ = this.route.data.subscribe(({ members }) => {
      this.committee = members;
      this.committeeName = members.name;
      this.legislators$ = this.filter.valueChanges.pipe(
        startWith(''),
        map((text) => this.search(text))
      );
    });
  }

  search(text: string): LegislatorSummary[] {
    return this.committee.currentMembers.filter((legislator) => {
      const term = text.toLowerCase();

      return (
        legislator.lastName.toLowerCase().startsWith(term) ||
        legislator.state.toLowerCase().startsWith(term)
      );
    });
  }
  ngOnInit(): void {}

  ngOnDestroy() {
    this.members$.unsubscribe();
  }
}
