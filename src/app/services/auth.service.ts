import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, BehaviorSubject, EMPTY } from 'rxjs';
import { filter, map, tap, shareReplay, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';
import { environment, nosqlEnvironment } from '../../environments/environment';
import { AuthContextService } from './auth-context.service';
import * as moment from 'moment';

export const ANONYMOUS_USER: User = {
  id: undefined,
  email: undefined,
  name: undefined,
  token: undefined,
  expiresIn: undefined,
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private subject = new BehaviorSubject<User>(undefined);

  user$: Observable<User> = this.subject
    .asObservable()
    .pipe(filter((user) => !!user));

  isLoggedIn$: Observable<boolean> = this.user$.pipe(
    map((user) => {
      return (
        !!user.id && moment().isBefore(this.authContextService.getExpiration())
      );
    })
  );

  isLoggedOut$: Observable<boolean> = this.isLoggedIn$.pipe(
    map((isLoggedIn) => !isLoggedIn)
  );

  constructor(
    public router: Router,
    private http: HttpClient,
    private authContextService: AuthContextService
  ) {
    http
      .get<User>(`${nosqlEnvironment.apiURL}auth/user`)
      .pipe(
        catchError(() => {
          this.subject.next(ANONYMOUS_USER);
          return EMPTY;
        })
      )
      .subscribe((user) => {
        this.subject.next(user ? user : ANONYMOUS_USER);
      });
  }

  login(email: string, password: string) {
    return this.http
      .post<User>(`${nosqlEnvironment.apiURL}auth/login`, { email, password })
      .pipe(
        shareReplay(),
        tap((user) => {
          if (user.token) {
            this.authContextService.setToken(user.token, user.expiresIn);
          }
        }),
        tap((user) => this.subject.next(user))
      );
  }

  register(name: string, email: string, password: string) {
    return this.http
      .post<User>(`${nosqlEnvironment.apiURL}auth/register`, {
        name,
        email,
        password,
      })
      .pipe(
        shareReplay(),
        tap((user) => {
          if (user.token) {
            this.authContextService.setToken(user.token, user.expiresIn);
          }
        }),
        tap((user) => this.subject.next(user))
      );
  }

  logout() {
    this.authContextService.removeToken();
    this.subject.next(ANONYMOUS_USER);
    this.router.navigate(['/welcome']);
  }
}
