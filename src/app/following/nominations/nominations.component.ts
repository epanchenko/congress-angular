import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Nomination } from '../../nomination/interfaces/nomination';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nominations',
  templateUrl: './nominations.component.html',
  styleUrls: ['./nominations.component.css'],
})
export class NominationsComponent implements OnInit, OnDestroy {
  nominations$: Subscription;
  nominations: Nomination[] = [];

  constructor(private route: ActivatedRoute) {
    this.nominations$ = this.route.data.subscribe(({ nominations }) => {
      if (nominations.length > 0) {
        for (const nomination of nominations) {
          this.nominations.push(nomination.nomination);
        }
      }
    });
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.nominations$.unsubscribe();
  }
}
