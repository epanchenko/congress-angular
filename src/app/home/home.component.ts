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
      { link: '/following/home', name: 'Following' },
      { link: '/legislator/all', name: 'Legislators' },
      { link: '/nominations/all', name: 'Nominations' },
      { link: '/committees/all', name: 'Committees' },
      { link: '/votes/all', name: 'Votes' },
      { link: '/dataSources/all', name: 'Data Sources' },
      { link: '/legislator/locate/legislators', name: 'Locate' },
    ];
  }

  ngOnInit(): void {}
}
