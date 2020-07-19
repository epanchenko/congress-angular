import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FollowingService {
  constructor(private http: HttpClient) {}

  getLegislators(): Observable<any> {
    return this.http.get<any>(`${environment.apiURL}following/getLegislators`);
  }

  getCommittees(): Observable<any> {
    return this.http.get<any>(`${environment.apiURL}following/getCommittees`);
  }

  getNominations(): Observable<any> {
    return this.http.get<any>(`${environment.apiURL}following/getNominations`);
  }

  getBills(): Observable<any> {
    return this.http.get<any>(`${environment.apiURL}following/getBills`);
  }
}
