import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommitteesDetail } from '../../committee/interfaces/committeesDetail';
import { Committee } from '../../shared/interfaces/committee';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-legislator-committees',
  templateUrl: './legislator-committees.component.html',
  styleUrls: ['./legislator-committees.component.css'],
})
export class LegislatorCommitteesComponent implements OnInit, OnDestroy {
  committeesDetail: CommitteesDetail;
  committees: Committee[];
  name: string;
  committees$: Subscription;

  constructor(private route: ActivatedRoute) {
    this.committees$ = this.route.data.subscribe(({ committees }) => {
      this.committees = committees.committees;
      this.name = committees.name;
    });
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.committees$.unsubscribe();
  }
}
