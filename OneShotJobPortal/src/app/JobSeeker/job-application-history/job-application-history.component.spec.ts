import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobApplicationHistoryComponent } from './job-application-history.component';

describe('JobApplicationHistoryComponent', () => {
  let component: JobApplicationHistoryComponent;
  let fixture: ComponentFixture<JobApplicationHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobApplicationHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobApplicationHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
