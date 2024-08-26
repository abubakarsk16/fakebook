import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidenav-content',
  templateUrl: './sidenav-content.component.html',
  styleUrls: ['./sidenav-content.component.scss'],
})
export class SidenavContentComponent implements OnInit {
  loggedInUser: User;

  constructor(private authService: AuthService) {
    this.loggedInUser = this.authService.getAuthUser();
  }

  ngOnInit(): void {}
}
