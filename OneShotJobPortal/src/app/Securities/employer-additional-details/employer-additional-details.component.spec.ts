import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerAdditionalDetailsComponent } from './employer-additional-details.component';

describe('EmployerAdditionalDetailsComponent', () => {
  let component: EmployerAdditionalDetailsComponent;
  let fixture: ComponentFixture<EmployerAdditionalDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployerAdditionalDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployerAdditionalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
