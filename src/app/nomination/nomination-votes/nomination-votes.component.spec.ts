import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NominationVotesComponent } from './nomination-votes.component';

describe('NominationVotesComponent', () => {
  let component: NominationVotesComponent;
  let fixture: ComponentFixture<NominationVotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NominationVotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NominationVotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
