import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { LegislatorSummary } from '../interfaces/legislatorSummary';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-legislators-common',
  templateUrl: './legislators-common.component.html',
  styleUrls: ['./legislators-common.component.css'],
})
export class LegislatorsCommonComponent implements OnInit {
  @Input() filter: FormControl;
  @Input() legislators$: Observable<LegislatorSummary[]>;
  @Input() title: string;
  @Input() legislators: LegislatorSummary[];

  constructor() {}

  ngOnInit(): void {}
}
