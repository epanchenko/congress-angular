import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { BillsService } from './bills.service';
import { BillAmendmentPage } from '../interfaces/billAmendmentPage';
import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BillAmendmentsResolverService
  implements Resolve<BillAmendmentPage> {
  constructor(private billsService: BillsService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot) {
    const { billID } = route.params;

    return this.billsService.getAmendments(billID).pipe(
      catchError((err) => {
        console.error(err);
        this.router.navigateByUrl('/pageNotFound');

        return EMPTY;
      })
    );
  }
}
