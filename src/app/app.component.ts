import {
  Component,
  ViewChild,
  ElementRef,
  ViewEncapsulation,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { NavItem } from './interfaces/navItem';
import { NavService } from './services/nav.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements AfterViewInit, OnDestroy {
  @ViewChild('appDrawer') appDrawer: ElementRef;

  navItems: NavItem[] = [
    {
      displayName: 'Home',
      iconName: 'home',
      route: '',
    },
    {
      displayName: 'Following',
      iconName: 'favorite',
      children: [
        {
          displayName: 'Legislators',
          iconName: 'view_comfy',
          route: 'following/legislators',
        },
        {
          displayName: 'Bills',
          iconName: 'book',
          route: 'following/bills',
        },
        {
          displayName: 'Nominations',
          iconName: 'person',
          route: 'following/nominations',
        },
        {
          displayName: 'Committees',
          iconName: 'people',
          route: 'following/committees',
        },
      ],
    },
    {
      displayName: 'Legislators',
      iconName: 'view_comfy',
      route: 'legislator/all',
    },
    {
      displayName: 'Nominations',
      iconName: 'person',
      route: 'nominations/all',
    },
    {
      displayName: 'Committees',
      iconName: 'people',
      route: 'committees/all',
    },
    {
      displayName: 'Votes',
      iconName: 'how_to_vote',
      route: 'votes/all',
    },
    {
      displayName: 'Data Sources',
      iconName: 'laptop',
      route: 'dataSources/all',
    },
    {
      displayName: 'Locate',
      iconName: 'location_on',
      route: 'legislator/locate/legislators',
    },
  ];

  loading = false;

  menu$: Subscription;

  constructor(
    public route: ActivatedRoute,
    private router: Router,
    private navService: NavService
  ) {
    this.menu$ = this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  ngAfterViewInit() {
    this.navService.appDrawer = this.appDrawer;
  }

  ngOnDestroy() {
    this.menu$.unsubscribe();
  }
}
