import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { NominationDetail } from '../interfaces/nominationDetail';
import { NominationActionPage } from '../interfaces/nominationActionPage';
import { Nominations } from '../interfaces/nominations';
import { Following } from '../../interfaces/following';

import {
  environment,
  nosqlEnvironment,
} from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NominationsService {
  savedNominations: Nominations;

  constructor(private http: HttpClient) {}

  getNominationDetail(nominationID: string): Observable<NominationDetail> {
    return this.http.get<NominationDetail>(
      `${environment.apiURL}nominations/nomination/nominationID/${nominationID}`
    );
  }

  getActions(nominationID: string): Observable<NominationActionPage> {
    return this.http.get<NominationActionPage>(
      `${environment.apiURL}nominations/nomination/nominationID/${nominationID}/actions`
    );
  }

  getNominations(): Observable<Nominations> {
    return this.http.get<Nominations>(`${environment.apiURL}nominations/all`);
  }

  saveNominations(nominations: Nominations) {
    this.savedNominations = nominations;
  }

  getSavedNominations(): Observable<Nominations> {
    return of(this.savedNominations);
  }

  getNominationsLastKey(
    nominationID: string,
    latestActionDate: string
  ): Observable<Nominations> {
    return this.http.get<Nominations>(
      `${environment.apiURL}nominations/all/nominationID/${nominationID}/latestActionDate/${latestActionDate}`
    );
  }

  createFollowingNomination(followingID: string): Observable<Following> {
    return this.http.post<Following>(
      `${nosqlEnvironment.apiURL}following/createNomination/`,
      { followingID }
    );
  }

  deleteFollowingNomination(followingID: string): Observable<{}> {
    return this.http.delete(
      `${nosqlEnvironment.apiURL}following/deleteNomination/${followingID}`
    );
  }

  findFollowingNomination(followingID: string): Observable<Following> {
    return this.http.get<Following>(
      `${nosqlEnvironment.apiURL}following/findNomination/${followingID}`
    );
  }
}
