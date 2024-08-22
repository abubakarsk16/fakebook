import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../services/layout.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  isHandset$ = this.layoutService.isHandset();
  isLaptopSmall$ = this.layoutService.isLaptopSmall();
  isMobile$ = this.layoutService.isMobile();
  users$ = this.userService.fetchUsers();

  loggedInUser!: User;
  constructor(
    private layoutService: LayoutService,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loggedInUser = this.authService.getAuthUser();
  }
}
