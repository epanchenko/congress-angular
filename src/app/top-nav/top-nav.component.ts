import { Component, OnInit } from '@angular/core';
import { NavService } from '../services/nav.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css'],
})
export class TopNavComponent implements OnInit {
  currentURL: string;

  constructor(
    public navService: NavService,
    public authService: AuthService,
    public router: Router
  ) {}

  ngOnInit(): void {}

  logout() {
    this.authService.logout();
  }
}
