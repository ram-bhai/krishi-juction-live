import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorhandlingComponent } from './errorhandling.component';

describe('ErrorhandlingComponent', () => {
  let component: ErrorhandlingComponent;
  let fixture: ComponentFixture<ErrorhandlingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorhandlingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorhandlingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
