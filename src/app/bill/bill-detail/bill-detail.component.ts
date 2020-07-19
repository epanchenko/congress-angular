import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BillDetail } from '../interfaces/billDetail';
import { BillAction } from '../interfaces/billAction';
import { AuthService } from '../../services/auth.service';
import { BillsService } from '../services/bills.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bill-detail',
  templateUrl: './bill-detail.component.html',
  styleUrls: ['./bill-detail.component.css'],
})
export class BillDetailComponent implements OnInit, OnDestroy {
  bill: BillDetail;
  billID: string;
  lastAction: BillAction;
  bill$: Subscription;
  followText = '';

  constructor(
    private route: ActivatedRoute,
    public authService: AuthService,
    private billsService: BillsService
  ) {
    this.bill$ = this.route.data.subscribe(({ bill }) => {
      this.bill = bill[0];
      this.billID = this.route.snapshot.params.billID;

      if (this.bill.actions.length > 0) {
        this.lastAction = this.bill.actions[0];
      }

      if (bill[1]) {
        this.bill.following = bill[1].status === 'found';
        this.followText = this.bill.following ? 'Unfollow' : 'Follow';
      }
    });
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.bill$.unsubscribe();
  }

  follow() {
    if (!this.bill.following) {
      this.billsService.createFollowingBill(this.billID).subscribe(() => {
        this.bill.following = true;
        this.followText = 'Unfollow';
      });
    } else {
      this.billsService.deleteFollowingBill(this.billID).subscribe(() => {
        this.bill.following = false;
        this.followText = 'Follow';
      });
    }
  }
}
