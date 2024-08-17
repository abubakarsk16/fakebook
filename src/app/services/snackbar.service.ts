import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../components/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  showMessage(
    message: string,
    type: string = 'default-snackbar',
    duration: number = 3000
  ): void {
    let icon = '';
    switch (type) {
      case 'success-snackbar':
        icon = 'check_circle';
        break;
      case 'error-snackbar':
        icon = 'error';
        break;
      case 'warning-snackbar':
        icon = 'warning';
        break;
      default:
        icon = 'info';
    }

    const config: MatSnackBarConfig = {
      duration: duration,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: [type],
    };

    this.snackBar.openFromComponent(SnackbarComponent, {
      data: { message, icon },
      ...config,
    });
  }
}
