import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UploadsComponent } from './uploads.component';
// import { UploadViewComponent } from './company-view.component';
// import { UploadEditComponent } from './company-edit.component';


@NgModule({
  imports: [RouterModule.forChild([
     {
    path: '',
    component: UploadsComponent,
  }
  /*,
  {
    path: 'view/:id',
    component: UploadViewComponent,
    data: {
      title: 'Details'
    }
  },

  {
    path: 'edit/:id',
    component: UploadEditComponent,
    data: {
      title: 'Edit'
    }
  },

  {
    path: 'create',
    component: UploadEditComponent,
    data: {
      title: 'Create'
    }
  }*/
  ])],
  exports: [RouterModule]
})
export class UploadsRoutingModule {}
