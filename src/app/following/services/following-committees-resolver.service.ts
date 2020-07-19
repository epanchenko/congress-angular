import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';

import * as _ from 'lodash-es';

import { Committee } from '../../shared/interfaces/committee';

import { FollowingService } from '../services/following.service';
import { Following } from '../../interfaces/following';
import { environment } from '../../../environments/environment';

import { catchError, exhaustMap, tap, map } from 'rxjs/operators';
import { EMPTY, forkJoin, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FollowingCommitteesResolverService implements Resolve<any> {
  constructor(
    private followingService: FollowingService,
    private router: Router,
    private http: HttpClient
  ) {}

  resolve(route: ActivatedRouteSnapshot) {
    const requests: Observable<Committee>[] = [];

    return this.followingService.getCommittees().pipe(
      catchError(() => {
        this.router.navigateByUrl('/pageNotFound');
        return EMPTY;
      }),
      map((data) => _.values(data)),
      map((data) => (data[1] as unknown) as Following[]),
      tap((committees: Following[]) => {
        for (const committee of committees) {
          requests.push(
            this.http.get<Committee>(
              `${environment.apiURL}committees/committee/committeeID/${committee.followingID}`
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
