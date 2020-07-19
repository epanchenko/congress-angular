import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NominationActionComponent } from './nomination-action/nomination-action.component';
import { NominationDetailComponent } from './nomination-detail/nomination-detail.component';
import { NominationVotesComponent } from './nomination-votes/nomination-votes.component';
import { NominationsComponent } from './nominations/nominations.component';

import { NominationDetailResolverService } from './services/nomination-detail-resolver.service';
import { NominationActionsResolverService } from './services/nomination-actions-resolver.service';
import { NominationVotesResolverService } from './services/nomination-votes-resolver.service';
import { NominationsResolverService } from './services/nominations-resolver.service';

const routes: Routes = [
  {
    path: 'nomination/nominationID/:nominationID',
    component: NominationDetailComponent,
    resolve: { nomination: NominationDetailResolverService },
  },
  {
    path: 'nomination/nominationID/:nominationID/actions',
    component: NominationActionComponent,
    resolve: { actions: NominationActionsResolverService },
  },
  {
    path: 'all',
    component: NominationsComponent,
    resolve: { nominations: NominationsResolverService },
  },
  {
    path: 'votes/nomination/nominationID/:nominationID',
    component: NominationVotesComponent,
    resolve: { votes: NominationVotesResolverService },
  },
];

@NgModule({
  declarations: [
    NominationActionComponent,
    NominationDetailComponent,
    NominationVotesComponent,
    NominationsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(
      routes /*, { scrollPositionRestoration: 'enabled' }*/
    ),
  ],
  exports: [RouterModule],
})
export class NominationModule {}
