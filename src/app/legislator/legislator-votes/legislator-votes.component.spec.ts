import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LegislatorVotesComponent } from './legislator-votes.component';

describe('LegislatorVotesComponent', () => {
  let component: LegislatorVotesComponent;
  let fixture: ComponentFixture<LegislatorVotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LegislatorVotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegislatorVotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
