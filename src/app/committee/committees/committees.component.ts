import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Committee } from '../../shared/interfaces/committee';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-committees',
  templateUrl: './committees.component.html',
  styleUrls: ['./committees.component.css'],
})
export class CommitteesComponent implements OnInit, OnDestroy {
  committees: Committee[];
  committees$: Subscription;

  constructor(private route: ActivatedRoute) {
    this.committees$ = this.route.data.subscribe(({ committees }) => {
      this.committees = committees.committees;

      this.committees.sort((a, b) =>
        a.committeeName > b.committeeName ? 1 : -1
      );
    });
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.committees$.unsubscribe();
  }
}
