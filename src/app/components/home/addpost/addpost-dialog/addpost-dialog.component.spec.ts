import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpostDialogComponent } from './addpost-dialog.component';

describe('AddpostDialogComponent', () => {
  let component: AddpostDialogComponent;
  let fixture: ComponentFixture<AddpostDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddpostDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddpostDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
