import { Injectable } from '@angular/core';

import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class AuthContextService {
  constructor() {}

  getToken() {
    return localStorage.getItem('token');
  }

  setToken(token: string, expires: number) {
    localStorage.setItem('token', token);
    localStorage.setItem(
      'expiresAt',
      JSON.stringify(moment().add(expires, 'second').valueOf())
    );
  }
  removeToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiresAt');
  }

  getExpiration() {
    return moment(JSON.parse(localStorage.getItem('expiresAt')));
  }
}
