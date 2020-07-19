import { Component, OnInit } from '@angular/core';

interface Link {
  link: string;
  name: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  links: Link[];

  constructor() {
    this.links = [
      { link: '/following/legislators', name: 'Legislators' },
      { link: '/following/bills', name: 'Bills' },
      { link: '/following/nominations', name: 'Nominations' },
      { link: '/following/committees', name: 'Committees' },
    ];
  }

  ngOnInit(): void {}
}
