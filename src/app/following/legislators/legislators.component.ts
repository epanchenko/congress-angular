import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { LegislatorSummary } from '../../shared/interfaces/legislatorSummary';
import { Observable, Subscription, of } from 'rxjs';

@Component({
  selector: 'app-legislators',
  templateUrl: './legislators.component.html',
  styleUrls: ['./legislators.component.css'],
})
export class LegislatorsComponent implements OnInit, OnDestroy {
  legislators: LegislatorSummary[] = [];
  legislators$: Observable<LegislatorSummary[]>;
  legislatorSummary$: Subscription;

  constructor(private route: ActivatedRoute) {
    this.legislatorSummary$ = this.route.data.subscribe(({ legislators }) => {
      if (legislators.length > 0) {
        for (const legislator of legislators) {
          this.legislators.push(legislator.data);
        }

        this.legislators.sort((a, b) => (a.lastName > b.lastName ? 1 : -1));
      }

      this.legislators$ = of(this.legislators);
    });
  }

  ngOnDestroy() {
    this.legislatorSummary$.unsubscribe();
  }

  ngOnInit(): void {}
}
