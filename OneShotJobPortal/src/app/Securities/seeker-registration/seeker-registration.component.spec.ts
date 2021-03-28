import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeekerRegistrationComponent } from './seeker-registration.component';

describe('SeekerRegistrationComponent', () => {
  let component: SeekerRegistrationComponent;
  let fixture: ComponentFixture<SeekerRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeekerRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeekerRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
