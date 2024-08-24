import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNavsComponent } from './sidenavs.component';

describe('SideNavsComponent', () => {
  let component: SideNavsComponent;
  let fixture: ComponentFixture<SideNavsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SideNavsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideNavsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
