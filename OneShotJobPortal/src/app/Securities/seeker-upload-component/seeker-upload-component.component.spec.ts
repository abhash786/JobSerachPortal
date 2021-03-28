import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeekerUploadComponentComponent } from './seeker-upload-component.component';

describe('SeekerUploadComponentComponent', () => {
  let component: SeekerUploadComponentComponent;
  let fixture: ComponentFixture<SeekerUploadComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeekerUploadComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeekerUploadComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
