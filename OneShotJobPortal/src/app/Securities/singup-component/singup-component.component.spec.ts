import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingupComponentComponent } from './singup-component.component';

describe('SingupComponentComponent', () => {
  let component: SingupComponentComponent;
  let fixture: ComponentFixture<SingupComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingupComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingupComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
