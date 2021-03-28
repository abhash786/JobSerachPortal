import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeekerLeftMenuComponent } from './seeker-left-menu.component';

describe('SeekerLeftMenuComponent', () => {
  let component: SeekerLeftMenuComponent;
  let fixture: ComponentFixture<SeekerLeftMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeekerLeftMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeekerLeftMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
