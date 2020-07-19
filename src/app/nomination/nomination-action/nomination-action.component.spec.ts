import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NominationActionComponent } from './nomination-action.component';

describe('NominationActionComponent', () => {
  let component: NominationActionComponent;
  let fixture: ComponentFixture<NominationActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NominationActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NominationActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
