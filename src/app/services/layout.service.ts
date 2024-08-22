import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  isHandset(): Observable<boolean> {
    return this.breakpointObserver.observe(Breakpoints.Handset).pipe(
      map((result) => result.matches),
      shareReplay()
    );
  }

  isLaptopSmall(): Observable<boolean> {
    return this.breakpointObserver
      .observe([Breakpoints.Handset, '(max-width: 1024px)'])
      .pipe(
        map((result) => result.matches),
        shareReplay()
      );
  }
  isMobile(): Observable<boolean> {
    return this.breakpointObserver
      .observe([Breakpoints.XSmall, '(max-width: 425px)'])
      .pipe(
        map((result) => result.matches),
        shareReplay()
      );
  }

  constructor(private breakpointObserver: BreakpointObserver) {}
}
