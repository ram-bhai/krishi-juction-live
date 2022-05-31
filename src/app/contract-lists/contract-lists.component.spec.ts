import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractListsComponent } from './contract-lists.component';

describe('ContractListsComponent', () => {
  let component: ContractListsComponent;
  let fixture: ComponentFixture<ContractListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractListsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
