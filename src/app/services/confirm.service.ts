import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../components/confirm/confirm.component';
import { lastValueFrom, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfirmService {
  constructor(private dialog: MatDialog) {}

  async confirmAction(title: string, description: string): Promise<boolean> {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '400px',
      data: { title, description },
    });
    return lastValueFrom(dialogRef.afterClosed());
  }
}
