import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CommitteeDetail } from '../interfaces/committeeDetail';
import { CommitteesService } from '../services/committees.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-committee-detail',
  templateUrl: './committee-detail.component.html',
  styleUrls: ['./committee-detail.component.css'],
})
export class CommitteeDetailComponent implements OnInit, OnDestroy {
  committee: CommitteeDetail;
  committeeID: string;
  committee$: Subscription;
  followText = '';

  constructor(
    private route: ActivatedRoute,
    public authService: AuthService,
    private committeesService: CommitteesService
  ) {
    this.committee$ = this.route.data.subscribe(({ committee }) => {
      this.committee = committee[0];
      this.committeeID = this.route.snapshot.params.committeeID;

      if (committee[1]) {
        this.committee.following = committee[1].status === 'found';
        this.followText = this.committee.following ? 'Unfollow' : 'Follow';
      }
    });
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.committee$.unsubscribe();
  }

  follow() {
    if (!this.committee.following) {
      this.committeesService
        .createFollowingCommittee(this.committeeID)
        .subscribe(() => {
          this.committee.following = true;
          this.followText = 'Unfollow';
        });
    } else {
      this.committeesService
        .deleteFollowingCommittee(this.committeeID)
        .subscribe(() => {
          this.committee.following = false;
          this.followText = 'Follow';
        });
    }
  }
}
