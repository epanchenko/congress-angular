import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

import { Committee } from '../../shared/interfaces/committee';
import { CommitteesService } from './committees.service';

@Injectable({
  providedIn: 'root',
})
export class CommitteesResolverService implements Resolve<Committee[]> {
  constructor(
    private committeesService: CommitteesService,
    private router: Router
  ) {}

  resolve() {
    return this.committeesService.getCommittees().pipe(
      catchError((err) => {
        console.error(err);
        this.router.navigateByUrl('/pageNotFound');

        return EMPTY;
      })
    );
  }
}
