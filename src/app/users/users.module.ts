import { AuthService } from './../core/services/auth.service';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { UsersComponent } from './users.component';
import { usersRouting } from './users.routes';


@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule, SharedModule, usersRouting
  ],
  providers : [AuthService]
})
export class UsersModule { }
