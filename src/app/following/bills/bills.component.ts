import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BillSummary } from '../interfaces/billSummary';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css'],
})
export class BillsComponent implements OnInit, OnDestroy {
  bills$: Subscription;
  bills: BillSummary[] = [];

  constructor(private route: ActivatedRoute) {
    this.bills$ = this.route.data.subscribe(({ bills }) => {

      if (bills.length > 0) {
        for (const bill of bills) {
          this.bills.push(bill);
        }
      }
    });
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.bills$.unsubscribe();
  }
}
