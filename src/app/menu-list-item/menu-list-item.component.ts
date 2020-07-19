import {
  Component,
  HostBinding,
  Input,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { NavItem } from '../interfaces/navItem';
import { Router } from '@angular/router';
import { NavService } from '../services/nav.service';
import { AuthService } from '../services/auth.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu-list-item',
  templateUrl: './menu-list-item.component.html',
  styleUrls: ['./menu-list-item.component.scss'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({ transform: 'rotate(0deg)' })),
      state('expanded', style({ transform: 'rotate(180deg)' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ]),
  ],
})
export class MenuListItemComponent implements OnInit, OnDestroy {
  expanded: boolean;
  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
  @Input() item: NavItem;
  @Input() depth: number;

  expand$: Subscription;

  constructor(
    public navService: NavService,
    public router: Router,
    private authService: AuthService
  ) {
    if (this.depth === undefined) {
      this.depth = 0;
    }
  }

  ngOnInit() {
    this.expand$ = this.navService.currentUrl.subscribe((url: string) => {
      if (this.item.displayName === 'Sign In') {
        this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
          if (isLoggedIn) {
            this.item.displayName = 'Sign Out';
          }
        });
      }

      if (this.item.route && url) {
        this.expanded = url.indexOf(`/${this.item.route}`) === 0;
        this.ariaExpanded = this.expanded;
      }
    });
  }

  ngOnDestroy() {
    this.expand$.unsubscribe();
  }

  onItemSelected(item: NavItem) {
    if (!item.children || !item.children.length) {
      this.router.navigate([item.route]);
      this.navService.closeNav();
    }
    if (item.children && item.children.length) {
      this.expanded = !this.expanded;
    }
  }
}
