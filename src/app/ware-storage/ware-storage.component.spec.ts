import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WareStorageComponent } from './ware-storage.component';

describe('WareStorageComponent', () => {
  let component: WareStorageComponent;
  let fixture: ComponentFixture<WareStorageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WareStorageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WareStorageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
