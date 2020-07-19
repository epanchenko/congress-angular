import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommitteeDetailComponent } from './committee-detail/committee-detail.component';
import { CommitteeMembersComponent } from './committee-members/committee-members.component';
import { CommitteeSubcommitteesComponent } from './committee-subcommittees/committee-subcommittees.component';
import { CommitteesComponent } from './committees/committees.component';
import { CommitteeMembersResolverService } from './services/committee-members-resolver.service';
import { CommitteeSubcommitteesResolverService } from './services/committee-subcommittees-resolver.service';
import { CommitteesResolverService } from './services/committees-resolver.service';
import { CommitteeDetailResolverService } from './services/committee-detail-resolver.service';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {
    path: 'all',
    component: CommitteesComponent,
    resolve: { committees: CommitteesResolverService },
  },
  {
    path: 'committee/committeeID/:committeeID',
    component: CommitteeDetailComponent,
    resolve: { committee: CommitteeDetailResolverService },
  },
  {
    path: 'committee/committeeID/:committeeID/members',
    component: CommitteeMembersComponent,
    resolve: { members: CommitteeMembersResolverService },
  },
  {
    path: 'committee/committeeID/:committeeID/subcommittees',
    component: CommitteeSubcommitteesComponent,
    resolve: { committees: CommitteeSubcommitteesResolverService },
  },
];

@NgModule({
  declarations: [
    CommitteeDetailComponent,
    CommitteeMembersComponent,
    CommitteeSubcommitteesComponent,
    CommitteesComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MatIconModule,
    SharedModule,
    RouterModule.forChild(
      routes /*, { scrollPositionRestoration: 'enabled' }*/
    ),
  ],
  exports: [RouterModule],
})
export class CommitteeModule {}
