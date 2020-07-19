import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BillAmendmentPage } from '../interfaces/billAmendmentPage';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bill-amendments',
  templateUrl: './bill-amendments.component.html',
  styleUrls: ['./bill-amendments.component.css'],
})
export class BillAmendmentsComponent implements OnInit, OnDestroy {
  billAmendment: BillAmendmentPage;
  billAmendments$: Subscription;

  constructor(private route: ActivatedRoute) {
    this.billAmendments$ = this.route.data.subscribe(({ amendments }) => {
      this.billAmendment = amendments;
    });
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.billAmendments$.unsubscribe();
  }
}
