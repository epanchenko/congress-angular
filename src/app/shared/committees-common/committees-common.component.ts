import { Component, OnInit, Input } from '@angular/core';
import { Committee } from '../interfaces/committee';

@Component({
  selector: 'app-committees-common',
  templateUrl: './committees-common.component.html',
  styleUrls: ['./committees-common.component.css'],
})
export class CommitteesCommonComponent implements OnInit {
  @Input() title: string;
  @Input() committees: Committee[];

  constructor() {}

  ngOnInit(): void {}
}
