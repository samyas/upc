import { PasswordResetComponent } from './password-reset.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


import { SharedModule } from '../shared/shared.module';
import { RegisterComponent } from './register.component';
import { AuthService } from './../core/services/auth.service';
import { RegisterRoutingModule } from './register-routing.module';
import { EmailSentComponent } from './email-sent.component';
import { EmailVerificationComponent } from './email-verification.component';

@NgModule({
  imports: [
    CommonModule, RouterModule, RegisterRoutingModule, SharedModule
  ],
  declarations: [RegisterComponent, EmailSentComponent, EmailVerificationComponent, PasswordResetComponent],
  providers: [ AuthService ]
})
export class RegisterModule { }
