import { Component, signal, inject, OnInit, OnDestroy } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule, MatChipInputEvent } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule, FormsModule, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BottomSheetContentComponent } from './bottom-sheet-content';
import { DialogContentComponent } from './dialog-content';

@Component({
  selector: 'app-material-examples',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatListModule,
    MatStepperModule,
    MatTabsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatBadgeModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatBottomSheetModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
  ],
  templateUrl: './material-examples.html',
  styleUrl: './material-examples.scss',
  standalone: true,
})
export class MaterialExamplesComponent implements OnInit, OnDestroy {
  private _bottomSheet = inject(MatBottomSheet);
  private _dialog = inject(MatDialog);
  private _snackBar = inject(MatSnackBar);

  progressValue = 0;
  private interval: any;

  // For Input Chips
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  keywords = signal(['angular', 'material', 'design']);
  formControl = new FormControl(['angular']);

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.keywords.update(keywords => [...keywords, value]);
    }
    event.chipInput!.clear();
  }

  remove(keyword: string): void {
    this.keywords.update(keywords => {
      const index = keywords.indexOf(keyword);
      if (index >= 0) {
        keywords.splice(index, 1);
        return [...keywords];
      }
      return keywords;
    });
  }


  ngOnInit() {
    this.interval = setInterval(() => {
      this.progressValue = (this.progressValue + 10) % 101;
    }, 300);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  iconCategories = [
    {
      name: 'Action',
      icons: ['search', 'home', 'account_circle', 'settings', 'done', 'info', 'check_circle', 'delete', 'visibility', 'favorite', 'star', 'description', 'shopping_cart', 'thumb_up', 'thumb_down', 'logout', 'exit_to_app']
    },
    {
      name: 'Navigation',
      icons: ['menu', 'close', 'arrow_back', 'arrow_forward', 'arrow_upward', 'arrow_downward', 'more_vert', 'more_horiz', 'refresh', 'apps', 'chevron_left', 'chevron_right', 'expand_less', 'expand_more', 'unfold_less', 'unfold_more']
    },
    {
      name: 'Content',
      icons: ['add', 'remove', 'edit', 'filter_list', 'sort', 'save', 'send', 'content_copy', 'content_cut', 'content_paste', 'link', 'email', 'flag', 'reply', 'report']
    },
    {
      name: 'Toggle',
      icons: ['check_box', 'check_box_outline_blank', 'radio_button_checked', 'radio_button_unchecked', 'star', 'star_border', 'star_half', 'toggle_on', 'toggle_off']
    },
    {
      name: 'Media',
      icons: ['play_arrow', 'pause', 'stop', 'skip_next', 'skip_previous', 'fast_forward', 'fast_rewind', 'volume_up', 'volume_down', 'volume_mute', 'mic', 'videocam', 'photo_camera', 'movie', 'mic_none', 'mic_off', 'videocam_off', 'fiber_manual_record', 'fiber_new', 'fiber_pin', 'fiber_smart_record']
    }
  ];

  openBottomSheet(): void {
    this._bottomSheet.open(BottomSheetContentComponent);
  }

  openDialog(): void {
    this._dialog.open(DialogContentComponent);
  }

  openSnackBar(): void {
    this._snackBar.open('Snackbar message', 'Close', {
      duration: 3000,
    });
  }

  copyToClipboard(code: string): void {
    navigator.clipboard.writeText(code).then(() => {
      this._snackBar.open('Copied to clipboard!', 'Dismiss', { duration: 2000 });
    }).catch(err => {
      console.error('Could not copy text: ', err);
      this._snackBar.open('Failed to copy!', 'Dismiss', { duration: 2000 });
    });
  }

  getRawHtmlCode(example: string): string {
    switch (example) {
      case 'autocomplete':
        return `<mat-form-field>
  <input type="text" placeholder="Pick one" aria-label="Number" matInput [matAutocomplete]="auto">
  <mat-autocomplete #auto="matAutocomplete">
    @for (option of ["One", "Two", "Three"]; track option) {
      <mat-option [value]="option">{{option}}</mat-option>
    }
  </mat-autocomplete>
</mat-form-field>`;
      case 'checkbox':
        return `<mat-checkbox>Check me!</mat-checkbox>`;
      case 'datepicker':
        return `<mat-form-field>
  <input matInput [matDatepicker]="picker" placeholder="Choose a date">
  <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
  <mat-datepicker #picker></mat-datepicker>
</mat-form-field>`;
      case 'form-field':
        return `<mat-form-field appearance="fill">
  <mat-label>Input (Fill)</mat-label>
  <input matInput>
</mat-form-field>

<mat-form-field appearance="outline">
  <mat-label>Input (Outline)</mat-label>
  <input matInput>
</mat-form-field>`;
      case 'input':
        return `<mat-form-field>
  <input matInput placeholder="Input">
</mat-form-field>`;
      case 'radio-button':
        return `<mat-radio-group>
  @for (option of ["Option 1", "Option 2"]; track option) {
    <mat-radio-button [value]="option">{{option}}</mat-radio-button>
  }
</mat-radio-group>`;
      case 'select':
        return `<mat-form-field>
  <mat-select placeholder="Select">
    @for (option of ["Option 1", "Option 2", "Option 3"]; track option) {
      <mat-option [value]="option">{{option}}</mat-option>
    }
  </mat-select>
</mat-form-field>`;
      case 'slider':
        return `<mat-slider min="1" max="100" step="1" value="50">
  <input matSliderThumb>
</mat-slider>

<mat-slider min="1" max="100" step="1">
  <input matSliderStartThumb value="30">
  <input matSliderEndThumb value="70">
</mat-slider>`;
      case 'slide-toggle':
        return `<mat-slide-toggle>Slide me!</mat-slide-toggle>`;
      case 'menu':
        return `<button mat-button [matMenuTriggerFor]="menu">Menu</button>
<mat-menu #menu="matMenu">
  <button mat-menu-item>Item 1</button>
  <button mat-menu-item>Item 2</button>
</mat-menu>`;
      case 'toolbar':
        return `<mat-toolbar>
  <span>My App</span>
</mat-toolbar>`;
      case 'card':
        return `<mat-card>
  <mat-card-header>
    <mat-card-title>Card Title</mat-card-title>
    <mat-card-subtitle>Card Subtitle</mat-card-subtitle>
  </mat-card-header>
  <mat-card-content>
    <p>This is card content.</p>
  </mat-card-content>
  <mat-card-actions>
    <button mat-button>LIKE</button>
    <button mat-button>SHARE</button>
  </mat-card-actions>
</mat-card>

<mat-card appearance="outlined">
  <mat-card-header>
    <mat-card-title>Outlined Card</mat-card-title>
    <mat-card-subtitle>Card Subtitle</mat-card-subtitle>
  </mat-card-header>
  <mat-card-content>
    <p>This is an outlined card.</p>
  </mat-card-content>
  <mat-card-actions>
    <button mat-button>LIKE</button>
    <button mat-button>SHARE</button>
  </mat-card-actions>
</mat-card>`;
      case 'divider':
        return `<mat-list>
  <mat-list-item>Item 1</mat-list-item>
  <mat-divider></mat-divider>
  <mat-list-item>Item 2</mat-list-item>
</mat-list>`;
      case 'expansion-panel':
        return `<mat-accordion>
  <mat-expansion-panel>
    <mat-expansion-panel-header>
      <mat-panel-title>
        This is the expansion title
      </mat-panel-title>
      <mat-panel-description>
        This is a summary of the content
      </mat-panel-description>
    </mat-expansion-panel-header>
    <p>This is the primary content of the panel.</p>
  </mat-expansion-panel>
  <mat-expansion-panel>
    <mat-expansion-panel-header>
      <mat-panel-title>
        Self-service Portal
      </mat-panel-title>
      <mat-panel-description>
        Find your updates and information
      </mat-panel-description>
    </mat-expansion-panel-header>
    <p>This is the primary content of the panel.</p>
  </mat-expansion-panel>
</mat-accordion>`;
      case 'grid-list':
        return `<mat-grid-list cols="2" rowHeight="2:1">
  <mat-grid-tile>1</mat-grid-tile>
  <mat-grid-tile>2</mat-grid-tile>
  <mat-grid-tile>3</mat-grid-tile>
  <mat-grid-tile>4</mat-grid-tile>
</mat-grid-list>`;
      case 'list':
        return `<mat-list>
  @for (item of ["Item 1", "Item 2", "Item 3"]; track item) {
    <mat-list-item>{{item}}</mat-list-item>
  }
</mat-list>`;
      case 'stepper':
        return `<mat-horizontal-stepper>
  <mat-step label="Step 1">
    <p>This is content for Step 1.</p>
  </mat-step>
  <mat-step label="Step 2">
    <p>This is content for Step 2.</p>
  </mat-step>
</mat-horizontal-stepper>`;
      case 'tabs':
        return `<mat-tab-group>
  <mat-tab label="First"> Content 1 </mat-tab>
  <mat-tab label="Second"> Content 2 </mat-tab>
  <mat-tab label="Third"> Content 3 </mat-tab>
</mat-tab-group>`;
      case 'button':
        return `<button mat-button>Basic</button>
<button mat-raised-button>Raised</button>
<button mat-stroked-button>Stroked</button>
<button mat-flat-button>Flat</button>
<button mat-tonal-button>Tonal</button>
<button mat-icon-button>
  <mat-icon>favorite</mat-icon>
</button>
<button mat-fab>
  <mat-icon>add</mat-icon>
</button>
<button mat-mini-fab>
  <mat-icon>add</mat-icon>
</button>`;
      case 'button-toggle':
        return `<mat-button-toggle-group name="fontStyle" aria-label="Font Style">
  <mat-button-toggle value="bold">Bold</mat-button-toggle>
  <mat-button-toggle value="italic">Italic</mat-button-toggle>
  <mat-button-toggle value="underline">Underline</mat-button-toggle>
</mat-button-toggle-group>`;
      case 'badge':
        return `<span matBadge="4" matBadgeOverlap="false">Text with a badge</span>`;
      case 'chips':
        return `<mat-form-field>
  <mat-label>Keywords</mat-label>
  <mat-chip-grid #chipGrid aria-label="Enter keywords">
    @for (keyword of keywords(); track keyword) {
      <mat-chip-row (removed)="remove(keyword)">
        {{keyword}}
        <button matChipRemove aria-label="'remove ' + keyword">
          <mat-icon>cancel</mat-icon>
        </button>
      </mat-chip-row>
    }
  </mat-chip-grid>
  <input placeholder="New keyword..."
         [matChipInputFor]="chipGrid"
         [matChipInputSeparatorKeyCodes]="separatorKeysCodes"
         (matChipInputTokenEnd)="add($event)"/>
</mat-form-field>`;

      case 'chips':
        return `readonly separatorKeysCodes: number[] = [ENTER, COMMA];
keywords = signal(['angular', 'material', 'design']);

add(event: MatChipInputEvent): void {
  const value = (event.value || '').trim();
  if (value) {
    this.keywords.update(keywords => [...keywords, value]);
  }
  event.chipInput!.clear();
}

remove(keyword: string): void {
  this.keywords.update(keywords => {
    const index = keywords.indexOf(keyword);
    if (index >= 0) {
      keywords.splice(index, 1);
      return [...keywords];
    }
    return keywords;
  });
}`;
      case 'icon':
        return `<mat-icon>home</mat-icon>`;
      case 'progress-spinner':
        return `<mat-progress-spinner mode="indeterminate"></mat-progress-spinner>\n<mat-progress-spinner mode="determinate" [value]="progressValue"></mat-progress-spinner>`;
      case 'progress-bar':
        return `<mat-progress-bar mode="indeterminate"></mat-progress-bar>\n<mat-progress-bar mode="determinate" [value]="progressValue"></mat-progress-bar>`;
      case 'bottom-sheet':
        return `<button mat-raised-button (click)="openBottomSheet()">Open Bottom Sheet</button>`;
      case 'dialog':
        return `<button mat-raised-button (click)="openDialog()">Open Dialog</button>`;
      case 'snackbar':
        return `<button mat-raised-button (click)="openSnackBar()">Open Snackbar</button>`;
      case 'tooltip':
        return `<button mat-button matTooltip="Tooltip!">Tooltip</button>`;
      case 'paginator':
        return `<mat-paginator [length]="100" [pageSize]="10" [pageSizeOptions]="[5, 10, 25, 100]"></mat-paginator>`;
      case 'sort-header':
        return `<table mat-table [dataSource]="[{position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'}]" matSort>
  <ng-container matColumnDef="name">
    <th mat-header-cell *matHeaderCellDef mat-sort-header> Name </th>
    <td mat-cell *matCellDef="let element"> {{element.name}} </td>
  </ng-container>
  <tr mat-header-row *matHeaderRowDef="['name']"></tr>
  <tr mat-row *matRowDef="let row; columns: ['name'];"></tr>
</table>`;
      case 'table':
        return `<table mat-table [dataSource]="[{position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'}]">
  <ng-container matColumnDef="position">
    <th mat-header-cell *matHeaderCellDef> No. </th>
    <td mat-cell *matCellDef="let element"> {{element.position}} </td>
  </ng-container>
  <ng-container matColumnDef="name">
    <th mat-header-cell *matHeaderCellDef> Name </th>
    <td mat-cell *matCellDef="let element"> {{element.name}} </td>
  </ng-container>
  <ng-container matColumnDef="weight">
    <th mat-header-cell *matHeaderCellDef> Weight </th>
    <td mat-cell *matCellDef="let element"> {{element.weight}} </td>
  </ng-container>
  <ng-container matColumnDef="symbol">
    <th mat-header-cell *matHeaderCellDef> Symbol </th>
    <td mat-cell *matCellDef="let element"> {{element.symbol}} </td>
  </ng-container>

  <tr mat-header-row *matHeaderRowDef="['position', 'name', 'weight', 'symbol']"></tr>
  <tr mat-row *matRowDef="let row; columns: ['position', 'name', 'weight', 'symbol'];"></tr>
</table>`;
      default:
        return '';
    }
  }

  getTsCode(example: string): string {
    switch (example) {
      case 'progress-spinner':
      case 'progress-bar':
        return `progressValue = 0;\nprivate interval: any;\n\nngOnInit() {\n  this.interval = setInterval(() => {\n    this.progressValue = (this.progressValue + 10) % 101;\n  }, 300);\n}\n\nngOnDestroy() {\n  clearInterval(this.interval);\n}`;
      case 'bottom-sheet':
        return `import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BottomSheetContentComponent } from './bottom-sheet-content';

...

constructor(private _bottomSheet: MatBottomSheet) {}

openBottomSheet(): void {
  this._bottomSheet.open(BottomSheetContentComponent);
}`;
      case 'dialog':
        return `import { MatDialog } from '@angular/material/dialog';
import { DialogContentComponent } from './dialog-content';

...

constructor(private _dialog: MatDialog) {}

openDialog(): void {
  this._dialog.open(DialogContentComponent);
}`;
      case 'snackbar':
        return `import { MatSnackBar } from '@angular/material/snack-bar';

...

constructor(private _snackBar: MatSnackBar) {}

openSnackBar(): void {
  this._snackBar.open('Snackbar message', 'Close', {
    duration: 3000,
  });
}`;
      default:
        return '';
    }
  }
}
