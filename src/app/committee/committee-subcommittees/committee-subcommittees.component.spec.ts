import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitteeSubcommitteesComponent } from './committee-subcommittees.component';

describe('CommitteeSubcommitteesComponent', () => {
  let component: CommitteeSubcommitteesComponent;
  let fixture: ComponentFixture<CommitteeSubcommitteesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommitteeSubcommitteesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommitteeSubcommitteesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
