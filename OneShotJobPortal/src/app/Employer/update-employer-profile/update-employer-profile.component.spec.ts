import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEmployerProfileComponent } from './update-employer-profile.component';

describe('UpdateEmployerProfileComponent', () => {
  let component: UpdateEmployerProfileComponent;
  let fixture: ComponentFixture<UpdateEmployerProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateEmployerProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateEmployerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
