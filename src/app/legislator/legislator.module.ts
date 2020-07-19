import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule } from '@agm/core';

import { LegislatorCommitteesComponent } from './legislator-committees/legislator-committees.component';
import { LegislatorDetailComponent } from './legislator-detail/legislator-detail.component';
import { LegislatorTermsComponent } from './legislator-terms/legislator-terms.component';
import { LegislatorVotesComponent } from './legislator-votes/legislator-votes.component';
import { LegislatorsComponent } from './legislators/legislators.component';
import { LocateLegislatorsComponent } from './locate-legislators/locate-legislators.component';
import { LegislatorsResolverService } from './services/legislators-resolver.service';
import { LegislatorDetailResolverService } from './services/legislator-detail-resolver.service';
import { LegislatorTermsResolverService } from './services/legislator-terms-resolver.service';
import { LegislatorCommitteesResolverService } from './services/legislator-committees-resolver.service';
import { LegislatorVotesResolverService } from './services/legislator-votes-resolver.service';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {
    path: 'all',
    component: LegislatorsComponent,
    resolve: { legislators: LegislatorsResolverService },
  },
  {
    path: ':id',
    component: LegislatorDetailComponent,
    resolve: { legislator: LegislatorDetailResolverService },
  },
  {
    path: 'terms/:id',
    component: LegislatorTermsComponent,
    resolve: { legislator: LegislatorTermsResolverService },
  },
  {
    path: ':bioguideID/committees',
    component: LegislatorCommitteesComponent,
    resolve: { committees: LegislatorCommitteesResolverService },
  },
  {
    path: 'locate/legislators',
    component: LocateLegislatorsComponent,
  },
  {
    path: 'votes/:id',
    component: LegislatorVotesComponent,
    resolve: { votes: LegislatorVotesResolverService },
  },
];

@NgModule({
  declarations: [
    LegislatorCommitteesComponent,
    LegislatorDetailComponent,
    LegislatorTermsComponent,
    LegislatorVotesComponent,
    LegislatorsComponent,
    LocateLegislatorsComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    MatIconModule,
    NgbModule,
    ReactiveFormsModule,
    SharedModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBhksvfCqUijFZR2Qo97MEbay - nDzM77b8',
    }),
  ],
  exports: [RouterModule],
})
export class LegislatorModule {}
