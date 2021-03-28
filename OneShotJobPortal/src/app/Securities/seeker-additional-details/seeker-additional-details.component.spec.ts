import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeekerAdditionalDetailsComponent } from './seeker-additional-details.component';

describe('SeekerAdditionalDetailsComponent', () => {
  let component: SeekerAdditionalDetailsComponent;
  let fixture: ComponentFixture<SeekerAdditionalDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeekerAdditionalDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeekerAdditionalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
