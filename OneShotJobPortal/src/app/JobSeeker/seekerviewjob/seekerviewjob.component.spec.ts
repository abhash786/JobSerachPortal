import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeekerviewjobComponent } from './seekerviewjob.component';

describe('SeekerviewjobComponent', () => {
  let component: SeekerviewjobComponent;
  let fixture: ComponentFixture<SeekerviewjobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeekerviewjobComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeekerviewjobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
