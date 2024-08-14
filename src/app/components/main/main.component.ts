import { Component, OnInit } from '@angular/core';
import { LayoutService } from './layout.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  isHandset$ = this.layoutService.isHandset();
  constructor(private layoutService: LayoutService) {}

  ngOnInit(): void {}
}
