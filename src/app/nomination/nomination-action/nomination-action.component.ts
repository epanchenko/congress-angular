import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NominationActionPage } from '../interfaces/nominationActionPage';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nomination-action',
  templateUrl: './nomination-action.component.html',
  styleUrls: ['./nomination-action.component.css'],
})
export class NominationActionComponent implements OnInit, OnDestroy {
  nominationAction: NominationActionPage;
  action$: Subscription;

  constructor(private route: ActivatedRoute) {
    this.action$ = this.route.data.subscribe(({ actions }) => {
      this.nominationAction = actions;
    });
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.action$.unsubscribe();
  }
}
