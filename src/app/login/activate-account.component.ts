import { AuthService } from '../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShortOrganisation } from '../core/model/auth.model';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./login.component.scss']
})
export class ActivateAccountComponent implements OnInit {

  public form: FormGroup;
  submitted = false;
  serverError = null;
  emailSent = false;
  testCode = null;

  constructor(  private router: Router, public fb: FormBuilder , private authService: AuthService) {

  }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['',  [Validators.required, Validators.email]],
  });
  }

   // convenience getter for easy access to form fields
   get f() { return this.form.controls; }

   onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    console.log('val', this.form.value);
    if (this.form.invalid) {
        return;
    }

    console.log(this.form.value);
    this.authService.requestResetPassword(this.form.value.email).subscribe(
      authUser => {
          this.emailSent = true;
      }
      , error =>  {
        console.log(error);
        this.serverError = error.message;
      }
    );
  }
}
