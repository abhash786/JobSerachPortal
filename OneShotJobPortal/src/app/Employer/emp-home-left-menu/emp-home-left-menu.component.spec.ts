import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpHomeLeftMenuComponent } from './emp-home-left-menu.component';

describe('EmpHomeLeftMenuComponent', () => {
  let component: EmpHomeLeftMenuComponent;
  let fixture: ComponentFixture<EmpHomeLeftMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpHomeLeftMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpHomeLeftMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
