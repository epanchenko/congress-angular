import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LegislatorTerms } from '../interfaces/legislatorTerms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-legislator-terms',
  templateUrl: './legislator-terms.component.html',
  styleUrls: ['./legislator-terms.component.css'],
})
export class LegislatorTermsComponent implements OnInit, OnDestroy {
  legislatorTerms: LegislatorTerms;
  terms$: Subscription;

  constructor(private route: ActivatedRoute) {
    this.terms$ = this.route.data.subscribe(({ legislator }) => {
      this.legislatorTerms = legislator;
    });
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.terms$.unsubscribe();
  }
}
