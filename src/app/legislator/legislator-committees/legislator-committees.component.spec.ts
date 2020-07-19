import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LegislatorCommitteesComponent } from './legislator-committees.component';

describe('LegislatorCommitteesComponent', () => {
  let component: LegislatorCommitteesComponent;
  let fixture: ComponentFixture<LegislatorCommitteesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LegislatorCommitteesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegislatorCommitteesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
