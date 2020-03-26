import { JoinRequest } from '../core/model/join-request.model';
import { AuthService } from '../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from '../core/validators/must-match.validator';
import { Register } from '../core/model/auth.model';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./register.component.scss']
})
export class PasswordResetComponent implements OnInit {

  public registerForm: FormGroup;
  submitted = false;
  serverError = '';
  emailVerification = true;
  username = null;
  joinRequest: JoinRequest = new JoinRequest();
  constructor(private route: ActivatedRoute, private router: Router,
    private authService: AuthService, public formBuilder: FormBuilder) {

  }

  ngOnInit() {

    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => of(params.get('token')))).subscribe((token) => {
      this.route.data.subscribe(data => {
        this.validateResetRequest(token);
    });
    });
    this.registerForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      emailToken: ['', Validators.required]
      }, {
        validator: MustMatch('password', 'confirmPassword')
    });
  }


  updateForm() {
      console.log('update form');
      this.registerForm.controls['emailToken'].patchValue( this.joinRequest.token);
  }


    validateResetRequest(token: string) {
      console.log('reset');
       this.authService.validateResetRequest(token).subscribe(
         data => {
            console.log('rest request data', data);
                 this.joinRequest = data;
                 this.emailVerification = false;
                 this.username = this.joinRequest.username;
                 this.updateForm();
          }
          , error =>  {
            console.log(error);
            this.serverError = error.message;
          }
        );
   }


     // convenience getter for easy access to form fields
 get f() { return this.registerForm.controls; }

 onSubmit() {
     this.submitted = true;
     // stop here if form is invalid
     console.log('val', this.registerForm.value);
     if (this.registerForm.invalid) {
         return;
     }
     const register: Register = this.registerForm.value;
     this.authService.resetPassword(register).subscribe(
      data => {
        this.router.navigate(['login/']);
      }
      , error =>  {
        console.log(error);
        this.serverError = error.message;
      }
    );
 }

}
