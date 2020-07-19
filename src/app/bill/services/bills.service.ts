import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { BillDetail } from '../interfaces/billDetail';
import { BillActionPage } from '../interfaces/billActionPage';
import { BillAmendmentPage } from '../interfaces/billAmendmentPage';
import { BillCommitteePage } from '../interfaces/billCommitteePage';
import { environment } from '../../../environments/environment';
import { Following } from '../../interfaces/following';

@Injectable({
  providedIn: 'root',
})
export class BillsService {
  constructor(private http: HttpClient) {}

  getBillDetail(billID: string): Observable<BillDetail> {
    return this.http.get<BillDetail>(
      `${environment.apiURL}bills/bill/billID/${billID}`
    );
  }

  getActions(billID: string): Observable<BillActionPage> {
    return this.http.get<BillActionPage>(
      `${environment.apiURL}bills/bill/billID/${billID}/actions`
    );
  }

  getAmendments(billID: string): Observable<BillAmendmentPage> {
    return this.http.get<BillAmendmentPage>(
      `${environment.apiURL}bills/bill/billID/${billID}/amendments`
    );
  }

  getCommittees(billID: string): Observable<BillCommitteePage> {
    return this.http.get<BillCommitteePage>(
      `${environment.apiURL}bills/bill/billID/${billID}/committees`
    );
  }

  createFollowingBill(followingID: string): Observable<Following> {
    return this.http.post<Following>(
      `${environment.apiURL}following/createBill/`,
      { followingID }
    );
  }

  deleteFollowingBill(followingID: string): Observable<{}> {
    return this.http.delete(
      `${environment.apiURL}following/deleteBill/${followingID}`
    );
  }

  findFollowingBill(followingID: string): Observable<Following> {
    return this.http.get<Following>(
      `${environment.apiURL}following/findBill/${followingID}`
    );
  }
}
