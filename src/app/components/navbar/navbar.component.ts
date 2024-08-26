import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ConfirmService } from 'src/app/services/confirm.service';
import { LayoutService } from 'src/app/services/layout.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  isHandset$ = this.layoutService.isHandset();
  isLaptopSmall$ = this.layoutService.isLaptopSmall();
  isMobile$ = this.layoutService.isMobile();

  @Input() leftSidenav!: MatSidenav;
  isSidenavOpen: boolean = false;

  subsscription!: Subscription;

  constructor(
    private layoutService: LayoutService,
    private router: Router,
    private authService: AuthService,
    private confirmService: ConfirmService
  ) {}

  ngOnInit(): void {
    this.subsscription = this.router.events.subscribe(() => {
      this.leftSidenav.close();
    });
  }

  toggleSidenav() {
    this.leftSidenav.toggle();
  }

  async handleLogoutClick() {
    const confirmed = await this.confirmService.confirmAction(
      'Logout',
      'Are you sure you want to logout?'
    );
    if (confirmed) {
      this.authService.logout();
    }
  }

  ngOnDestroy(): void {
    if (this.subsscription) {
      this.subsscription.unsubscribe();
    }
  }
}
