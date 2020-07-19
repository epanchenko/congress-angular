import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { LegislatorDetail } from '../interfaces/legislatorDetail';
import { stateAbbrevations } from '../../utils/utils';
import { AuthService } from '../../services/auth.service';
import { LegislatorService } from '../../legislator/services/legislator.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-legislator-detail',
  templateUrl: './legislator-detail.component.html',
  styleUrls: ['./legislator-detail.component.css'],
})
export class LegislatorDetailComponent implements OnInit, OnDestroy {
  legislator: LegislatorDetail;
  bioguideID = '';
  legislator$: Subscription;
  followText = '';

  public polylines: Array<any>;

  constructor(
    private route: ActivatedRoute,
    public authService: AuthService,
    private legislatorService: LegislatorService
  ) {
    this.legislator$ = this.route.data.subscribe(({ legislator }) => {
      this.bioguideID = this.route.snapshot.params.id;
      this.legislator = legislator[0];
      this.legislator.data.coordinates =
        legislator[1].data.geometry.coordinates[0];
      this.polylines = this.rebuildPolylines();

      if (legislator[2]) {
        this.legislator.data.following = legislator[2].status === 'found';
        this.followText = this.legislator.data.following
          ? 'Unfollow'
          : 'Follow';
      }
    });
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.legislator$.unsubscribe();
  }

  getName() {
    const { firstName, middleName, lastName } = this.legislator.data;
    return `${firstName} ${middleName} ${lastName}`;
  }

  getImageWebsite() {
    return `https://theunitedstates.io/images/congress/225x275/${this.bioguideID}.jpg`;
  }

  getBioWebsite() {
    return `http://bioguide.congress.gov/scripts/biodisplay.pl?index=${this.bioguideID}`;
  }

  getTwitter() {
    return `https://twitter.com/${this.legislator.data.twitterAccount}`;
  }

  getYouTube() {
    return `https://www.youtube.com/${this.legislator.data.youtubeAccount}`;
  }

  getFacebook() {
    return `https://www.youtube.com/${this.legislator.data.facebookAccount}`;
  }

  getTelephone() {
    return `tel:1-${this.legislator.data.phone}`;
  }

  getDescription() {
    let location = stateAbbrevations[this.legislator.data.state];

    if (this.legislator.data.district !== '') {
      location = location + ' - District ' + this.legislator.data.district;
    }

    return `${this.legislator.data.position}, ${location} (${this.legislator.data.party})`;
  }

  private rebuildPolylines() {
    const polylines = [];

    for (const point of this.legislator.data.coordinates) {
      polylines.push({ longitude: point[0], latitude: point[1] });
    }

    return polylines;
  }

  follow() {
    if (!this.legislator.data.following) {
      this.legislatorService
        .createFollowingLegislator(this.bioguideID)
        .subscribe(() => {
          this.legislator.data.following = true;
          this.followText = 'Unfollow';
        });
    } else {
      this.legislatorService
        .deleteFollowingLegislator(this.bioguideID)
        .subscribe(() => {
          this.legislator.data.following = false;
          this.followText = 'Follow';
        });
    }
  }
}
