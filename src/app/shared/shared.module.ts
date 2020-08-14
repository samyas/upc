import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { PaginationComponent } from './pagination/pagination.component';
import { TruncateTextPipe } from '../core/config/truncate-text.pipe';
import { DefaultImageDirective } from './image/default-image.directive';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule,
    NgSelectModule

  ],
  declarations: [ PaginationComponent, TruncateTextPipe, DefaultImageDirective],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule,
    NgSelectModule,
    PaginationComponent,
    TruncateTextPipe,
    DefaultImageDirective
  ]
})
export class SharedModule { }
