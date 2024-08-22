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

  async handleLogoutClick() {
    const confirmed = await this.confirmDialogService.confirmAction(
      'Logout',
      'Are you sure you want to logout?'
    );
    if (confirmed) {
      this.authService.logout();
    }
  }
}
