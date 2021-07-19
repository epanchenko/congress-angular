import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash-es';

import { Observable } from 'rxjs';

import { CommitteeDetail } from '../interfaces/committeeDetail';
import { CommitteeMemberDetail } from '../interfaces/committeeMemberDetail';
import { CommitteesDetail } from '../interfaces/committeesDetail';
import { Committee } from '../../shared/interfaces/committee';
import {
  environment,
  nosqlEnvironment,
} from '../../../environments/environment';
import { Following } from '../../interfaces/following';

@Injectable({
  providedIn: 'root',
})
export class CommitteesService {
  constructor(private http: HttpClient) {}

  getCommittees(): Observable<Committee[]> {
    return this.http.get<Committee[]>(
      `${environment.apiURL}committees/allCommittees`
    );
  }

  getCommitteeDetail(committeeID: string): Observable<CommitteeDetail> {
    return this.http.get<CommitteeDetail>(
      `${environment.apiURL}committees/committee/committeeID/${committeeID}`
    );
  }

  getMembers(committeeID: string): Observable<CommitteeMemberDetail> {
    return this.http.get<CommitteeMemberDetail>(
      `${environment.apiURL}committees/committee/committeeID/${committeeID}/members`
    );
  }

  getSubcommittees(committeeID: string): Observable<CommitteesDetail> {
    return this.http.get<CommitteesDetail>(
      `${environment.apiURL}committees/committee/committeeID/${committeeID}/subcommittees`
    );
  }

  createFollowingCommittee(followingID: string): Observable<Following> {
    return this.http.post<Following>(
      `${nosqlEnvironment.apiURL}following/createCommittee/`,
      { followingID }
    );
  }

  deleteFollowingCommittee(followingID: string): Observable<{}> {
    return this.http.delete(
      `${nosqlEnvironment.apiURL}following/deleteCommittee/${followingID}`
    );
  }

  findFollowingCommittee(followingID: string): Observable<Following> {
    return this.http.get<Following>(
      `${nosqlEnvironment.apiURL}following/findCommittee/${followingID}`
    );
  }
}
