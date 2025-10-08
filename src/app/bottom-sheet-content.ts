import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-bottom-sheet-content',
  templateUrl: './bottom-sheet-content.html',
  standalone: true,
  imports: [MatListModule],
})
export class BottomSheetContentComponent {
  constructor(private _bottomSheetRef: MatBottomSheetRef<BottomSheetContentComponent>) {}

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
