import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillVotesComponent } from './bill-votes.component';

describe('BillVotesComponent', () => {
  let component: BillVotesComponent;
  let fixture: ComponentFixture<BillVotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillVotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillVotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
