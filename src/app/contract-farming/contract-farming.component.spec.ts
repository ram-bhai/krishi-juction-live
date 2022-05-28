import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractFarmingComponent } from './contract-farming.component';

describe('ContractFarmingComponent', () => {
  let component: ContractFarmingComponent;
  let fixture: ComponentFixture<ContractFarmingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractFarmingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractFarmingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
