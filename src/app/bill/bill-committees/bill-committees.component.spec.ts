import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillCommitteesComponent } from './bill-committees.component';

describe('BillCommitteesComponent', () => {
  let component: BillCommitteesComponent;
  let fixture: ComponentFixture<BillCommitteesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillCommitteesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillCommitteesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
