import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { BillsService } from './bills.service';
import { BillDetail } from '../interfaces/billDetail';
import { Following } from '../../interfaces/following';

import { EMPTY, forkJoin } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BillsDetailResolverService
  implements Resolve<[BillDetail, Following]> {
  constructor(private billsService: BillsService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot) {
    const { billID } = route.params;

    const request1 = this.billsService.getBillDetail(billID).pipe(
      catchError((err) => {
        console.error(err);
        this.router.navigateByUrl('/pageNotFound');

        return EMPTY;
      })
    );

    const request2 = this.billsService.findFollowingBill(billID).pipe(
      catchError(() => {
        return EMPTY;
      })
    );

    return forkJoin([request1, request2]);
  }
}
