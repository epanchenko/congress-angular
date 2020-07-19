import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocateLegislatorsComponent } from './locate-legislators.component';

describe('LocateLegislatorsComponent', () => {
  let component: LocateLegislatorsComponent;
  let fixture: ComponentFixture<LocateLegislatorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocateLegislatorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocateLegislatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
