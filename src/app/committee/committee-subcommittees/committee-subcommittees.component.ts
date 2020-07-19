import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommitteesDetail } from '../interfaces/committeesDetail';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-committee-subcommittees',
  templateUrl: './committee-subcommittees.component.html',
  styleUrls: ['./committee-subcommittees.component.css'],
})
export class CommitteeSubcommitteesComponent implements OnInit, OnDestroy {
  committees: CommitteesDetail;
  committeeName: string;
  committees$: Subscription;

  constructor(private route: ActivatedRoute) {
    this.committees$ = this.route.data.subscribe(({ committees }) => {
      this.committees = committees.committees.sort((a, b) =>
        a.committeeName.toUpperCase() > b.committeeName.toUpperCase() ? 1 : -1
      );

      this.committeeName = committees.committeeName;
    });
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.committees$.unsubscribe();
  }
}
