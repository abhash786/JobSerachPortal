import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeekerDescriptionComponent } from './seeker-description.component';

describe('SeekerDescriptionComponent', () => {
  let component: SeekerDescriptionComponent;
  let fixture: ComponentFixture<SeekerDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeekerDescriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeekerDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
