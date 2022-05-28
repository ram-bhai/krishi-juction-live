import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyStorageComponent } from './my-storage.component';

describe('MyStorageComponent', () => {
  let component: MyStorageComponent;
  let fixture: ComponentFixture<MyStorageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyStorageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyStorageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
