import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { LayoutService } from 'src/app/services/layout.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isHandset$ = this.layoutService.isHandset();
  isLaptopSmall$ = this.layoutService.isLaptopSmall();
  isMobile$ = this.layoutService.isMobile();

  constructor(private layoutService: LayoutService) {}
  @Output() openMenuEvent = new EventEmitter<void>();

  ngOnInit(): void {}

  openLeftMenu() {
    this.openMenuEvent.emit();
  }
}
