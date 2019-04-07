import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule, MatToolbarModule, MatChipsModule, MatOptionModule,
  MatGridListModule, MatProgressBarModule, MatSliderModule, MatSlideToggleModule, MatMenuModule,
  MatDialogModule, MatSnackBarModule, MatSelectModule, MatInputModule,
  MatSidenavModule, MatCardModule, MatIconModule, MatRadioModule, MatProgressSpinnerModule,
  MatTabsModule, MatListModule, MatExpansionModule, MatTableModule , MatPaginatorModule, MatDatepickerModule,
  MatNativeDateModule, MatStepperModule} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule, MatCheckboxModule, MatToolbarModule, MatChipsModule, MatOptionModule,
    MatGridListModule, MatProgressBarModule, MatSliderModule, MatSlideToggleModule, MatMenuModule,
    MatDialogModule, MatSnackBarModule, MatSelectModule, MatInputModule, MatSidenavModule,
    MatCardModule, MatIconModule, MatRadioModule, MatProgressSpinnerModule,
    MatTabsModule, MatListModule, MatExpansionModule, MatTableModule, MatPaginatorModule, MatDatepickerModule, MatNativeDateModule,
    MatStepperModule
  ],
  exports: [
    MatButtonModule, MatCheckboxModule, MatToolbarModule, MatChipsModule, MatOptionModule,
    MatGridListModule, MatProgressBarModule, MatSliderModule, MatSlideToggleModule, MatMenuModule,
    MatDialogModule, MatSnackBarModule, MatSelectModule, MatInputModule, MatSidenavModule,
    MatCardModule, MatIconModule, MatRadioModule, MatProgressSpinnerModule,
    MatTabsModule, MatListModule, MatExpansionModule, MatTableModule, MatPaginatorModule, MatDatepickerModule, MatNativeDateModule,
     MatStepperModule
  ],
})
export class MaterialModule { }
