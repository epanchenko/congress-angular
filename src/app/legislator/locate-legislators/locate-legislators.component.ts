import { Component, OnInit, OnDestroy } from '@angular/core';

import { LegislatorService } from '../services/legislator.service';
import { AuthService } from '../../services/auth.service';
import { LegislatorDetail } from '../interfaces/legislatorDetail';
import { LegislatorSummary } from '../../shared/interfaces/legislatorSummary';
import { fieldSorter } from '../../utils/utils';
import { catchError } from 'rxjs/operators';
import { Observable, of, EMPTY, Subscription } from 'rxjs';
import { Following } from '../../interfaces/following';

@Component({
  selector: 'app-locate-legislators',
  templateUrl: './locate-legislators.component.html',
  styleUrls: ['./locate-legislators.component.css'],
})
export class LocateLegislatorsComponent implements OnInit, OnDestroy {
  latitude: number;
  longitude: number;
  legislators: LegislatorSummary[];
  locationFound: boolean;
  legislators$: Observable<LegislatorSummary[]>;
  followingLegislators: Following[];
  following$: Subscription;
  coordinates$: Subscription;
  location$: Subscription;

  constructor(
    private legislatorService: LegislatorService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.legislators = [];

    this.location$ = this.legislatorService
      .getLocation()
      .pipe(
        catchError(() => {
          return EMPTY;
        })
      )
      .subscribe((coordinates) => {
        [this.longitude, this.latitude] = coordinates;

        this.coordinates$ = this.legislatorService
          .getLegislatorsFromCoordinates(this.longitude, this.latitude)
          .pipe(
            catchError(() => {
              return EMPTY;
            })
          )
          .subscribe((results: LegislatorDetail[]) => {
            for (const legislator of results) {
              this.legislators.push({
                bioguideID: legislator.data.bioguideID,
                chamber: legislator.data.chamber,
                firstName: legislator.data.firstName,
                lastName: legislator.data.lastName,
                party: legislator.data.party,
                position: legislator.data.position,
                state: legislator.data.state,
                district: legislator.data.district,
                following: false,
              });
            }

            this.legislators.sort(fieldSorter(['lastName', 'firstName']));
            this.locationFound = true;
            this.legislators$ = of(this.legislators);
          });
      });
  }

  ngOnDestroy() {
    this.coordinates$.unsubscribe();
    this.location$.unsubscribe();
  }
}
