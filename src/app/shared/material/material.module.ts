import { NgModule } from '@angular/core';

import { MatButtonModule, MatCheckboxModule, MatToolbarModule, MatChipsModule, MatOptionModule,
  MatGridListModule, MatProgressBarModule, MatSliderModule, MatSlideToggleModule, MatMenuModule,
  MatDialogModule, MatSnackBarModule, MatSelectModule, MatInputModule,
  MatSidenavModule, MatCardModule, MatIconModule, MatRadioModule, MatProgressSpinnerModule,
  MatTabsModule, MatListModule, MatExpansionModule, MatTableModule , MatPaginatorModule} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule, MatCheckboxModule, MatToolbarModule, MatChipsModule, MatOptionModule,
    MatGridListModule, MatProgressBarModule, MatSliderModule, MatSlideToggleModule, MatMenuModule,
    MatDialogModule, MatSnackBarModule, MatSelectModule, MatInputModule, MatSidenavModule,
    MatCardModule, MatIconModule, MatRadioModule, MatProgressSpinnerModule,
    MatTabsModule, MatListModule, MatExpansionModule, MatTableModule, MatPaginatorModule
  ],
  exports: [
    MatButtonModule, MatCheckboxModule, MatToolbarModule, MatChipsModule, MatOptionModule,
    MatGridListModule, MatProgressBarModule, MatSliderModule, MatSlideToggleModule, MatMenuModule,
    MatDialogModule, MatSnackBarModule, MatSelectModule, MatInputModule, MatSidenavModule,
    MatCardModule, MatIconModule, MatRadioModule, MatProgressSpinnerModule,
    MatTabsModule, MatListModule, MatExpansionModule, MatTableModule, MatPaginatorModule
  ],
})
export class MaterialModule { }
