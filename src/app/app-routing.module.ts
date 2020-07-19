import { NgModule } from '@angular/core';
import {
  Routes,
  RouterModule,
  Router,
  NavigationStart,
  NavigationEnd,
  RouterEvent,
} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { VoteDetailComponent } from './vote/vote-detail/vote-detail.component';
import { VoteDetailResolverService } from './vote/services/vote-detail-resolver.service';
import { VotesComponent } from './vote/votes/votes.component';
import { VotesResolverService } from './vote/services/votes-resolver.service';

import { filter } from 'rxjs/operators';

const routes: Routes = [
  {
    path: 'following',
    loadChildren: () =>
      import('./following/following.module').then((m) => m.FollowingModule),
  },
  {
    path: 'legislator',
    loadChildren: () =>
      import('./legislator/legislator.module').then((m) => m.LegislatorModule),
  },
  {
    path: 'bills',
    loadChildren: () => import('./bill/bill.module').then((m) => m.BillModule),
  },
  {
    path: 'nominations',
    loadChildren: () =>
      import('./nomination/nomination.module').then((m) => m.NominationModule),
  },
  {
    path: 'committees',
    loadChildren: () =>
      import('./committee/committee.module').then((m) => m.CommitteeModule),
  },
  {
    path: 'welcome',
    component: HomeComponent,
  },
  {
    path: 'dataSources',
    loadChildren: () =>
      import('./data-sources/data-sources.module').then(
        (m) => m.DataSourcesModule
      ),
  },
  {
    path: 'votes/vote/rollID/:rollID',
    component: VoteDetailComponent,
    resolve: { vote: VoteDetailResolverService },
  },
  {
    path: 'votes/all',
    component: VotesComponent,
    resolve: { votes: VotesResolverService },
  },

  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: 'pageNotFound', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [
    // doesn't work yet with mat side nav, solution is below
    RouterModule.forRoot(
      routes

      /*, { scrollPositionRestoration: 'enabled' }*/
    ),
  ],
  exports: [RouterModule],
})

// scroll to top of new page, remember place of previous page https://github.com/angular/angular/issues/24547
export class AppRoutingModule {
  scrollTopPositions: { [url: string]: number } = {};

  constructor(router: Router) {
    router.events
      .pipe(
        filter(
          (e: RouterEvent) =>
            e instanceof NavigationStart || e instanceof NavigationEnd
        )
      )
      .subscribe({
        next: (e: RouterEvent) => {
          const scrollContainer = document.querySelector(
            '.mat-sidenav-content'
          );

          if (e instanceof NavigationStart) {
            this.scrollTopPositions[router.url] = scrollContainer.scrollTop;
          } else if (e instanceof NavigationEnd) {
            const newUrl = router.url;
            setTimeout(() => {
              scrollContainer.scrollTop = this.scrollTopPositions[newUrl];
            }, 0);
          }
        },
      });
  }
}
