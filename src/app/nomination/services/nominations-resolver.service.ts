import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import {
  Router,
  NavigationStart,
  Event as NavigationEvent,
} from '@angular/router';
import { Nominations } from '../interfaces/nominations';
import { NominationsService } from '../services/nominations.service';
import { EMPTY } from 'rxjs';
import { catchError, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NominationsResolverService implements Resolve<Nominations> {
  loadSavedNominations = false;

  constructor(
    private nominationsService: NominationsService,
    private router: Router
  ) {
    router.events
      .pipe(
        filter((event: NavigationEvent) => {
          return event instanceof NavigationStart;
        })
      )
      .subscribe((event: NavigationStart) => {
        if (event.restoredState) {
          this.loadSavedNominations = true;
        } else {
          this.loadSavedNominations = false;
        }
      });
  }

  resolve(route: ActivatedRouteSnapshot) {
    if (!this.loadSavedNominations) {
      return this.nominationsService.getNominations().pipe(
        catchError((err) => {
          console.error(err);
          this.router.navigateByUrl('/pageNotFound');

          return EMPTY;
        })
      );
    } else {
      return this.nominationsService.getSavedNominations().pipe(
        catchError((err) => {
          console.error(err);
          this.router.navigateByUrl('/pageNotFound');

          return EMPTY;
        })
      );
    }
  }
}
