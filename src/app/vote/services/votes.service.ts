import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { VoteSummary } from '../votes/interfaces/voteSummary';
import { VoteSummaryLastKey } from '../votes/interfaces/voteSummaryLastKey';
import { VoteDetail } from '../votes/interfaces/voteDetail';
import { BillVotes } from '../../bill/interfaces/billVotes';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VotesService {
  savedLegislatorVotes: VoteSummary;
  savedBillVotes: BillVotes;
  savedVotes: VoteSummary;

  constructor(private http: HttpClient) {}

  getLegislatorVotes(id: string): Observable<VoteSummary> {
    return this.http.get<VoteSummary>(
      `${environment.apiURL}votes/legislator/${id}/all`
    );
  }

  getLegislatorVotesSaved(): Observable<VoteSummary> {
    return of(this.savedLegislatorVotes);
  }

  saveLegislatorVotes(legislatorVotes: VoteSummary) {
    this.savedLegislatorVotes = legislatorVotes;
  }

  saveVotes(votes: VoteSummary) {
    this.savedVotes = votes;
  }

  getSavedVotes(): Observable<VoteSummary> {
    return of(this.savedVotes);
  }

  saveBillVotes(billVotes: BillVotes) {
    this.savedBillVotes = billVotes;
  }

  getBillVotesSaved(): Observable<BillVotes> {
    return of(this.savedBillVotes);
  }

  getLegislatorVotesLastEvalKey(
    id: string,
    rollID: string,
    votedAt: string
  ): Observable<VoteSummaryLastKey> {
    return this.http.get<VoteSummaryLastKey>(
      `${environment.apiURL}votes/legislator/${id}/rollID/${rollID}/votedAt/${votedAt}`
    );
  }

  getVoteDetail(rollID: string): Observable<VoteDetail> {
    return this.http.get<VoteDetail>(
      `${environment.apiURL}votes/vote/rollID/${rollID}`
    );
  }

  getBillVotes(billID: string): Observable<BillVotes> {
    return this.http.get<BillVotes>(
      `${environment.apiURL}votes/billID/${billID}/all`
    );
  }

  getBillVotesLastEvalKey(
    billID: string,
    rollID: string,
    votedAt: string
  ): Observable<BillVotes> {
    return this.http.get<BillVotes>(
      `${environment.apiURL}votes/billID/${billID}/rollID/${rollID}/votedAt/${votedAt}`
    );
  }

  getNominationVotes(nominationID: string): Observable<BillVotes> {
    return this.http.get<BillVotes>(
      `${environment.apiURL}votes/nomination/nominationID/${nominationID}`
    );
  }

  getAllVotes(): Observable<VoteSummary> {
    return this.http.get<VoteSummary>(`${environment.apiURL}votes/all`);
  }

  getAllVotesLastKey(rollID: string, votedAt: string): Observable<VoteSummary> {
    return this.http.get<VoteSummary>(
      `${environment.apiURL}votes/all/rollID/${rollID}/votedAt/${votedAt}`
    );
  }
}
