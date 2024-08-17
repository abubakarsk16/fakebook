import { Component, OnInit } from '@angular/core';
import { ConfirmService } from 'src/app/services/confirm.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private confirmDialogService: ConfirmService
  ) {}

  ngOnInit(): void {}

  handleLogoutClick() {
    this.confirmDialogService
      .confirmAction('Logout', 'Are you sure you want to logout?')
      .subscribe((result) => {
        if (result) {
          this.authService.logout();
        }
      });
  }
}
