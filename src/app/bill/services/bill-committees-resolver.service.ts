import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { BillsService } from './bills.service';
import { BillCommitteePage } from '../interfaces/billCommitteePage';
import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BillCommitteesResolverService
  implements Resolve<BillCommitteePage> {
  constructor(private billsService: BillsService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot) {
    const { billID } = route.params;

    return this.billsService.getCommittees(billID).pipe(
      catchError((err) => {
        console.error(err);
        this.router.navigateByUrl('/pageNotFound');

        return EMPTY;
      })
    );
  }
}
