import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentEditFormComponent } from './comment-edit-form.component';

describe('CommentEditFormComponent', () => {
  let component: CommentEditFormComponent;
  let fixture: ComponentFixture<CommentEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentEditFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
