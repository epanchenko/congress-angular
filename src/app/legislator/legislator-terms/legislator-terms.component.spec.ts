import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LegislatorTermsComponent } from './legislator-terms.component';

describe('LegislatorTermsComponent', () => {
  let component: LegislatorTermsComponent;
  let fixture: ComponentFixture<LegislatorTermsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LegislatorTermsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegislatorTermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
