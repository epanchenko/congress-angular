import { Component, OnInit, OnDestroy } from '@angular/core';
import { LegislatorSummary } from '../../shared/interfaces/legislatorSummary';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-legislators',
  templateUrl: './legislators.component.html',
  styleUrls: ['./legislators.component.css'],
})
export class LegislatorsComponent implements OnInit, OnDestroy {
  legislators: LegislatorSummary[];
  legislators$: Observable<LegislatorSummary[]>;
  filter = new FormControl('');
  legislatorSummary$: Subscription;

  constructor(private route: ActivatedRoute) {
    this.legislatorSummary$ = this.route.data.subscribe(({ legislators }) => {
      this.legislators = legislators;

      this.legislators$ = this.filter.valueChanges.pipe(
        startWith(''),
        map((text) => this.search(text))
      );
    });
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.legislatorSummary$.unsubscribe();
  }

  search(text: string): LegislatorSummary[] {
    return this.legislators.filter((legislator) => {
      const term = text.toLowerCase();

      return (
        legislator.lastName.toLowerCase().startsWith(term) ||
        legislator.state.toLowerCase().startsWith(term)
      );
    });
  }
}
