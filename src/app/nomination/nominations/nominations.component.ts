import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NominationsService } from '../services/nominations.service';
import { AuthService } from '../../services/auth.service';

import { Nominations } from '../interfaces/nominations';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-nominations',
  templateUrl: './nominations.component.html',
  styleUrls: ['./nominations.component.css'],
})
export class NominationsComponent implements OnInit, OnDestroy {
  nominations: Nominations;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private nominationsService: NominationsService,
    private authService: AuthService
  ) {
    this.route.data
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(({ nominations }) => {
        this.nominations = nominations;

        if (!this.nominations.lastEvaluatedKey) {
          this.nominations.moreNominationsAvailable = false;
        } else {
          this.nominations.moreNominationsAvailable = true;
        }

        nominationsService.saveNominations(this.nominations);
      });
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  moreNominations() {
    this.nominationsService
      .getNominationsLastKey(
        this.nominations.lastEvaluatedKey.nominationID,
        this.nominations.lastEvaluatedKey.latestActionDate
      )
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((nominations) => {
        nominations.nominations.forEach((nomination) => {
          this.nominations.nominations.push(nomination);
        });

        this.nominations.lastEvaluatedKey = nominations.lastEvaluatedKey;

        if (!nominations.lastEvaluatedKey) {
          this.nominations.moreNominationsAvailable = false;
        } else {
          this.nominations.moreNominationsAvailable = true;
        }

        this.nominationsService.saveNominations(this.nominations);
      });
  }

  getDetailLink(nominationID: string) {
    return `nominations/nomination/nominationID/:nominationID/${nominationID}`;
  }
}
