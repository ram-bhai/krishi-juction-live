import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageCommentComponent } from './storage-comment.component';

describe('StorageCommentComponent', () => {
  let component: StorageCommentComponent;
  let fixture: ComponentFixture<StorageCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StorageCommentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StorageCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
