import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentBottomSheetComponent } from './comment-bottom-sheet.component';

describe('CommentBottomSheetComponent', () => {
  let component: CommentBottomSheetComponent;
  let fixture: ComponentFixture<CommentBottomSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentBottomSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
