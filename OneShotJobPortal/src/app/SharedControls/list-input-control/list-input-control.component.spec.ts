import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInputControlComponent } from './list-input-control.component';

describe('ListInputControlComponent', () => {
  let component: ListInputControlComponent;
  let fixture: ComponentFixture<ListInputControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListInputControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListInputControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
