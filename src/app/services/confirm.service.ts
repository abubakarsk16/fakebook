import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../components/confirm/confirm.component';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfirmService {
  constructor(private dialog: MatDialog) {}

  confirmAction(title: string, description: string): Observable<Boolean> {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: { title, description },
    });
    return dialogRef.afterClosed();
  }
}
