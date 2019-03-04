import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadsRoutingModule } from './uploads-routing.module';
import { UploadsComponent } from './uploads.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule, SharedModule, UploadsRoutingModule
  ],
  declarations: [UploadsComponent]
})
export class UploadsModule { }
