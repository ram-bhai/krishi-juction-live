import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipementsDetailsComponent } from './equipements-details.component';

describe('EquipementsDetailsComponent', () => {
  let component: EquipementsDetailsComponent;
  let fixture: ComponentFixture<EquipementsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipementsDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipementsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
