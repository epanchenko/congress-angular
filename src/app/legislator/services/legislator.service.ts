import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LegislatorSummary } from '../../shared/interfaces/legislatorSummary';
import { LegislatorDetail } from '../interfaces/legislatorDetail';
import { DistrictCoordinates } from '../interfaces/districtCoordinates';
import { District } from '../interfaces/district';
import { BioguideID } from '../interfaces/bioguideID';
import { LegislatorTerms } from '../interfaces/legislatorTerms';
import { CommitteesDetail } from '../../committee/interfaces/committeesDetail';
import { Following } from '../../interfaces/following';

import { Observable, of, forkJoin } from 'rxjs';
import { map, tap, exhaustMap } from 'rxjs/operators';
import * as _ from 'lodash-es';

import {
  environment,
  nosqlEnvironment,
} from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LegislatorService {
  legislators: LegislatorSummary[] = [];

  constructor(private http: HttpClient) {}

  getLegislatorsRequest(): Observable<LegislatorSummary[]> {
    if (this.legislators.length === 0) {
      return this.http
        .get<LegislatorSummary[]>(
          `${environment.apiURL}legislators/allLegislators`
        )
        .pipe(tap((data) => (this.legislators = data)));
    }

    return of(this.legislators);
  }

  getLegislatorRequest(bioguideId: string) {
    return this.http.get<LegislatorDetail>(
      `${environment.apiURL}legislators/legislator/${bioguideId}`
    );
  }

  getCoordinates(district: string) {
    return this.http.get<DistrictCoordinates>(
      `${nosqlEnvironment.apiURL}legislators/coordinates/${district}`
    );
  }

  getCommittees(bioguideID: string) {
    return this.http.get<CommitteesDetail>(
      `${environment.apiURL}legislators/legislator/${bioguideID}/committees`
    );
  }

  getDistricts(longitude: number, latitude: number) {
    return this.http.get<District[]>(
      `${nosqlEnvironment.apiURL}legislators/locDists/${longitude},${latitude}`
    );
  }

  getLegislatorTerms(id: string) {
    return this.http.get<LegislatorTerms>(
      `${environment.apiURL}legislators/legislator/terms/${id}`
    );
  }

  getLegislatorsFromCoordinates(longitude: number, latitude: number) {
    const requests = [];

    return this.http
      .get(
        `${nosqlEnvironment.apiURL}legislators/locDists/${longitude},${latitude}`
      )
      .pipe(
        map((data) => _.values(data)),
        map((data) => data[1] as unknown),
        tap((bioguideIDs: BioguideID[]) => {
          for (const bioguideID of bioguideIDs) {
            requests.push(
              this.http.get(
                `${environment.apiURL}legislators/legislator/summary/${bioguideID.bioguideID}`
              )
            );
          }
        }),
        exhaustMap(() => {
          return forkJoin(requests);
        })
      );
  }

  getLocation(): Observable<number[]> {
    return new Observable((observer) => {
      if (window.navigator && window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(
          (position) => {
            observer.next([
              position.coords.longitude,
              position.coords.latitude,
            ]);
            observer.complete();
          },
          (error) => observer.error(error)
        );
      } else {
        observer.error('Location not available');
      }
    });
  }

  createFollowingLegislator(followingID: string): Observable<Following> {
    return this.http.post<Following>(
      `${nosqlEnvironment.apiURL}following/createLegislator/`,
      { followingID }
    );
  }

  deleteFollowingLegislator(followingID: string): Observable<{}> {
    return this.http.delete(
      `${nosqlEnvironment.apiURL}following/deleteLegislator/${followingID}`
    );
  }

  findFollowingLegislator(followingID: string): Observable<Following> {
    return this.http.get<Following>(
      `${nosqlEnvironment.apiURL}following/findLegislator/${followingID}`
    );
  }
}
