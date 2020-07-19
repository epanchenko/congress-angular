import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LegislatorsCommonComponent } from './legislators-common.component';

describe('LegislatorsCommonComponent', () => {
  let component: LegislatorsCommonComponent;
  let fixture: ComponentFixture<LegislatorsCommonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LegislatorsCommonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegislatorsCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
