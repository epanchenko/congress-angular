import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitteesCommonComponent } from './committees-common.component';

describe('CommitteesCommonComponent', () => {
  let component: CommitteesCommonComponent;
  let fixture: ComponentFixture<CommitteesCommonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommitteesCommonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommitteesCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
