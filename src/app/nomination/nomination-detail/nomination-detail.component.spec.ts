import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NominationDetailComponent } from './nomination-detail.component';

describe('NominationDetailComponent', () => {
  let component: NominationDetailComponent;
  let fixture: ComponentFixture<NominationDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NominationDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NominationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
