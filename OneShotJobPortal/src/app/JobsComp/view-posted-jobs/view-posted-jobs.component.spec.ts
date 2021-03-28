import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPostedJobsComponent } from './view-posted-jobs.component';

describe('ViewPostedJobsComponent', () => {
  let component: ViewPostedJobsComponent;
  let fixture: ComponentFixture<ViewPostedJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPostedJobsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPostedJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
