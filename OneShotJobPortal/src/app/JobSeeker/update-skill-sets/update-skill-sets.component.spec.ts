import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSkillSetsComponent } from './update-skill-sets.component';

describe('UpdateSkillSetsComponent', () => {
  let component: UpdateSkillSetsComponent;
  let fixture: ComponentFixture<UpdateSkillSetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSkillSetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSkillSetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
