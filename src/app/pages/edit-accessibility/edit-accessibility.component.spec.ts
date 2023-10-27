import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAccessibilityComponent } from './edit-accessibility.component';

describe('EditAccessibilityComponent', () => {
  let component: EditAccessibilityComponent;
  let fixture: ComponentFixture<EditAccessibilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAccessibilityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAccessibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
