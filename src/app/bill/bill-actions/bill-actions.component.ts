import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BillActionPage } from '../interfaces/billActionPage';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bill-actions',
  templateUrl: './bill-actions.component.html',
  styleUrls: ['./bill-actions.component.css'],
})
export class BillActionsComponent implements OnInit, OnDestroy {
  billAction: BillActionPage;

  billDetails$: Subscription;

  constructor(private route: ActivatedRoute) {
    this.billDetails$ = this.route.data.subscribe(({ actions }) => {
      this.billAction = actions;
    });
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.billDetails$.unsubscribe();
  }
}
