import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { User } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { LayoutService } from 'src/app/services/layout.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sidenavs',
  templateUrl: './sidenavs.component.html',
  styleUrls: ['./sidenavs.component.scss'],
})
export class SideNavsComponent implements OnInit {
  isLaptopSmall$ = this.layoutService.isLaptopSmall();
  isHandset$ = this.layoutService.isHandset();
  isMobile$ = this.layoutService.isMobile();
  users$ = this.userService.fetchUsers();
  loggedInUser!: User;

  @ViewChild('drawerLeft') drawerLeft!: MatDrawer;

  constructor(
    private layoutService: LayoutService,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loggedInUser = this.authService.getAuthUser();
  }

  openLeft(): void {
    this.drawerLeft.open();
  }
}
