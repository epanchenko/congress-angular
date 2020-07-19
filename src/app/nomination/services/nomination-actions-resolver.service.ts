import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { NominationsService } from './nominations.service';
import { NominationActionPage } from '../interfaces/nominationActionPage';
import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NominationActionsResolverService
  implements Resolve<NominationActionPage> {
  constructor(
    private nominationsService: NominationsService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot) {
    const { nominationID } = route.params;

    return this.nominationsService.getActions(nominationID).pipe(
      catchError((err) => {
        console.error(err);
        this.router.navigateByUrl('/pageNotFound');

        return EMPTY;
      })
    );
  }
}
