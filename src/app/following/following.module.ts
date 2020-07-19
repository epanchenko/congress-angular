import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LegislatorsComponent } from './legislators/legislators.component';
import { BillsComponent } from './bills/bills.component';
import { NominationsComponent } from './nominations/nominations.component';
import { CommitteesComponent } from './committees/committees.component';
import { FollowingLegislatorsResolverService } from './services/following-legislators-resolver.service';
import { FollowingCommitteesResolverService } from './services/following-committees-resolver.service';
import { FollowingNominationsResolverService } from './services/following-nominations-resolver.service';
import { FollowingBillsResolverService } from './services/following-bills-resolver.service';

import { AuthGuard } from '../auth.guard';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'legislators',
    component: LegislatorsComponent,
    resolve: { legislators: FollowingLegislatorsResolverService },
    canActivate: [AuthGuard],
  },
  {
    path: 'committees',
    component: CommitteesComponent,
    resolve: { committees: FollowingCommitteesResolverService },
    canActivate: [AuthGuard],
  },
  {
    path: 'nominations',
    component: NominationsComponent,
    resolve: { nominations: FollowingNominationsResolverService },
    canActivate: [AuthGuard],
  },
  {
    path: 'bills',
    component: BillsComponent,
    resolve: { bills: FollowingBillsResolverService },
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [
    HomeComponent,
    LegislatorsComponent,
    BillsComponent,
    NominationsComponent,
    CommitteesComponent,
  ],
  imports: [RouterModule.forChild(routes), CommonModule, SharedModule],
})
export class FollowingModule {}
