import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpHomeDescriptionComponent } from './emp-home-description.component';

describe('EmpHomeDescriptionComponent', () => {
  let component: EmpHomeDescriptionComponent;
  let fixture: ComponentFixture<EmpHomeDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpHomeDescriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpHomeDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
