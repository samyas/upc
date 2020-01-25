import { EmailSentComponent } from './email-sent.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RegisterComponent } from './register.component';
import { EmailVerificationComponent } from './email-verification.component';



@NgModule({
  imports: [RouterModule.forChild([
  {
    path: '',
    component: RegisterComponent
  },
  {
    path: 'email-sent',
    component: EmailSentComponent
  },
  {
    path: 'validate/:token',
    component: EmailVerificationComponent
  }
  ])],
  exports: [RouterModule]
})

export class RegisterRoutingModule {}