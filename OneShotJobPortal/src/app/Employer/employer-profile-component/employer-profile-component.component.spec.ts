import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerProfileComponentComponent } from './employer-profile-component.component';

describe('EmployerProfileComponentComponent', () => {
  let component: EmployerProfileComponentComponent;
  let fixture: ComponentFixture<EmployerProfileComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployerProfileComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployerProfileComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
