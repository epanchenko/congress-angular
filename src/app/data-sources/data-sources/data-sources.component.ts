import { Component, OnInit } from '@angular/core';

interface Link {
  link: string;
  name: string;
}

@Component({
  selector: 'app-data-sources',
  templateUrl: './data-sources.component.html',
  styleUrls: ['./data-sources.component.css'],
})
export class DataSourcesComponent implements OnInit {
  links: Link[];

  constructor() {
    this.links = [
      { link: 'https://propublica.org', name: 'Propublica Congress API' },
      { link: 'https://www.loc.gov', name: 'U.S. Library of Congress' },
      {
        link: 'http://bioguide.congress.gov',
        name: 'Biographical Directory of the U.S. Congress',
      },
      {
        link: 'https://github.com/unitedstates/districts',
        name: 'GitHub U.S. District Coordinates',
      },
      {
        link: 'http://thenounproject.com/term/capitol-building/160031/',
        name: 'Capitol Building Image',
      },
      { link: 'http://www.senate.gov', name: 'U.S. Senate' },
      { link: 'http://www.house.gov', name: 'U.S. House of Representatives' },
    ];
  }

  ngOnInit(): void {}
}
