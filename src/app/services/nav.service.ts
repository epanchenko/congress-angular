import { Injectable, OnDestroy } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';

@Injectable()
export class NavService implements OnDestroy {
  public appDrawer: any;
  public currentUrl = new BehaviorSubject<string>(undefined);

  nav$: Subscription;

  constructor(private router: Router) {
    this.nav$ = this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl.next(event.urlAfterRedirects);
      }
    });
  }

  ngOnDestroy() {
    this.nav$.unsubscribe();
  }

  public closeNav() {
    this.appDrawer.close();
  }

  public openNav() {
    this.appDrawer.open();
  }

  public click() {
    if (!this.appDrawer.opened) {
      this.openNav();
    } else {
      this.closeNav();
    }
  }
}
