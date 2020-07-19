import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BillCommitteePage } from '../interfaces/billCommitteePage';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bill-committees',
  templateUrl: './bill-committees.component.html',
  styleUrls: ['./bill-committees.component.css'],
})
export class BillCommitteesComponent implements OnInit, OnDestroy {
  billCommittees: BillCommitteePage;
  billCommittees$: Subscription;

  constructor(private route: ActivatedRoute) {
    this.billCommittees$ = this.route.data.subscribe(({ committees }) => {
      this.billCommittees = committees;
    });
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.billCommittees$.unsubscribe();
  }
}
