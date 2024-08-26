import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { LayoutService } from 'src/app/services/layout.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  isHandset$ = this.layoutService.isHandset();
  @ViewChild('leftDrawer') leftSidenav!: MatSidenav;

  constructor(private layoutService: LayoutService) {}

  ngOnInit(): void {}
}
