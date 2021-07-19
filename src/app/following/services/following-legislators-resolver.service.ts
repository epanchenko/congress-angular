import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';

import * as _ from 'lodash-es';

import { LegislatorSummary } from '../../shared/interfaces/legislatorSummary';
import { FollowingService } from '../services/following.service';
import { Following } from '../../interfaces/following';
import { environment } from '../../../environments/environment';

import { catchError, exhaustMap, tap, map } from 'rxjs/operators';
import { EMPTY, forkJoin, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FollowingLegislatorsResolverService implements Resolve<any> {
  constructor(
    private followingService: FollowingService,
    private router: Router,
    private http: HttpClient
  ) {}

  resolve(route: ActivatedRouteSnapshot) {
    const requests: Observable<LegislatorSummary>[] = [];

    return this.followingService.getLegislators().pipe(
      catchError(() => {
        this.router.navigateByUrl('/pageNotFound');
        return EMPTY;
      }),
      map((data) => _.values(data)),
      map((data) => data[1] as unknown as Following[]),
      tap((legislators: Following[]) => {
        for (const legislator of legislators) {
          requests.push(
            this.http.get<LegislatorSummary>(
              `${environment.apiURL}legislators/legislator/summary/${legislator.followingID}`
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
