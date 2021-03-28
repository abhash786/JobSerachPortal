import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateUploadComponent } from './corporate-upload.component';

describe('CorporateUploadComponent', () => {
  let component: CorporateUploadComponent;
  let fixture: ComponentFixture<CorporateUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorporateUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
