import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';

import * as _ from 'lodash-es';

import { FollowingService } from '../services/following.service';
import { Following } from '../../interfaces/following';
import { BillSummary } from '../interfaces/billSummary';
import { environment } from '../../../environments/environment';

import { catchError, exhaustMap, tap, map } from 'rxjs/operators';
import { EMPTY, forkJoin, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FollowingBillsResolverService implements Resolve<any> {
  constructor(
    private followingService: FollowingService,
    private router: Router,
    private http: HttpClient
  ) {}

  resolve(route: ActivatedRouteSnapshot) {
    const requests: Observable<BillSummary>[] = [];

    return this.followingService.getBills().pipe(
      catchError(() => {
        this.router.navigateByUrl('/pageNotFound');
        return EMPTY;
      }),
      map((data) => _.values(data)),
      map((data) => (data[1] as unknown) as Following[]),
      tap((bills: Following[]) => {
        for (const bill of bills) {
          requests.push(
            this.http.get<BillSummary>(
              `${environment.apiURL}bills/billSummary/billID/${bill.followingID}`
            )
          );
        }
      }),
      exhaustMap(() => {
        if (requests.length > 0) {
          return forkJoin(requests);
        } else {
          return [EMPTY];
        }
      })
    );
  }
}
