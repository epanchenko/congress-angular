import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { BillActionsComponent } from './bill-actions/bill-actions.component';
import { BillAmendmentsComponent } from './bill-amendments/bill-amendments.component';
import { BillCommitteesComponent } from './bill-committees/bill-committees.component';
import { BillDetailComponent } from './bill-detail/bill-detail.component';
import { BillVotesComponent } from './bill-votes/bill-votes.component';
import { BillsDetailResolverService } from './services/bills-detail-resolver.service';
import { BillAmendmentsResolverService } from './services/bill-amendments-resolver.service';
import { BillActionsResolverService } from './services/bill-actions-resolver.service';
import { BillVotesResolverService } from './services/bill-votes-resolver.service';
import { BillCommitteesResolverService } from './services/bill-committees-resolver.service';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {
    path: 'bill/billID/:billID',
    component: BillDetailComponent,
    resolve: { bill: BillsDetailResolverService },
  },
  {
    path: 'bill/billID/:billID/actions',
    component: BillActionsComponent,
    resolve: { actions: BillActionsResolverService },
  },
  {
    path: 'bill/billID/:billID/amendments',
    component: BillAmendmentsComponent,
    resolve: { amendments: BillAmendmentsResolverService },
  },
  {
    path: 'votes/bill/billID/:billID',
    component: BillVotesComponent,
    resolve: { votes: BillVotesResolverService },
  },
  {
    path: 'bill/billID/:billID/committees',
    component: BillCommitteesComponent,
    resolve: { committees: BillCommitteesResolverService },
  },
];

@NgModule({
  declarations: [
    BillActionsComponent,
    BillAmendmentsComponent,
    BillCommitteesComponent,
    BillDetailComponent,
    BillVotesComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(
      routes /*, { scrollPositionRestoration: 'enabled' }*/
    ),
    CommonModule,
  ],
  exports: [RouterModule],
})
export class BillModule {}
