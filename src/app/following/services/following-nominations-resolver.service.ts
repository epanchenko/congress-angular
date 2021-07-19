import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';

import * as _ from 'lodash-es';

import { FollowingService } from '../services/following.service';
import { Following } from '../../interfaces/following';
import { Nomination } from '../../nomination/interfaces/nomination';
import { environment } from '../../../environments/environment';

import { catchError, exhaustMap, tap, map } from 'rxjs/operators';
import { EMPTY, forkJoin, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FollowingNominationsResolverService implements Resolve<any> {
  constructor(
    private followingService: FollowingService,
    private router: Router,
    private http: HttpClient
  ) {}

  resolve(route: ActivatedRouteSnapshot) {
    const requests: Observable<Nomination>[] = [];

    return this.followingService.getNominations().pipe(
      catchError(() => {
        this.router.navigateByUrl('/pageNotFound');
        return EMPTY;
      }),
      map((data) => _.values(data)),
      map((data) => data[1] as unknown as Following[]),
      tap((nominations: Following[]) => {
        for (const nomination of nominations) {
          requests.push(
            this.http.get<Nomination>(
              `${environment.apiURL}nominations/nomination/nominationID/${nomination.followingID}`
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
