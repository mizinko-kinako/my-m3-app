import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dialog-content',
  templateUrl: './dialog-content.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class DialogContentComponent {
  constructor(public dialogRef: MatDialogRef<DialogContentComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
