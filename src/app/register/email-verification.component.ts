import { JoinRequest } from './../core/model/join-request.model';
import { AuthService } from '../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from '../core/validators/must-match.validator';
import { Register } from '../core/model/auth.model';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./register.component.scss']
})
export class EmailVerificationComponent implements OnInit {

  public registerForm: FormGroup;
  submitted = false;
  serverError = '';
  emailVerification = true;
  joinRequest: JoinRequest = new JoinRequest();
  constructor(private route: ActivatedRoute, private router: Router,
    private authService: AuthService, public formBuilder: FormBuilder) {

  }

  ngOnInit() {

    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => of(params.get('token')))).subscribe((token) => {
      this.route.data.subscribe(data => {
        if (data && data.name === 'join') {
          this.validateJoinRequest(token);
        } else if (data && data.name === 'reset') {
          this.validateJoinRequest(token);
        } else {
          this.validate(token);
        }
    });
    });
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      emailToken: ['', Validators.required],
      isCreator: [false],

      }, {
        validator: MustMatch('password', 'confirmPassword')
    });
  }

  validate(token: string) {
    console.log('validate');
    this.authService.validate(token).subscribe(
      data => {
        this.router.navigate(['login/']);
      }
      , error =>  {
        console.log(error);
        this.serverError = error.message;
      }
    );
  }


  updateForm() {
      console.log('update form');
      this.registerForm.controls['emailToken'].patchValue( this.joinRequest.token);
      this.registerForm.controls['firstName'].patchValue( this.joinRequest.firstName);
      this.registerForm.controls['lastName'].patchValue( this.joinRequest.lastName);
      this.registerForm.controls['email'].patchValue( this.joinRequest.email);
  }


  validateJoinRequest(token: string) {
    console.log('join');
     this.authService.validateJoinRequest(token).subscribe(
       data => {
          console.log('join request data', data);
          if (data.result === 'REGISTER') {
               this.joinRequest = data;
               this.emailVerification = false;
               this.updateForm();
          } else {
            this.router.navigate(['login/']);
          }

        }
        , error =>  {
          console.log(error);
          this.serverError = error.message;
        }
      );
    }

    validateResetRequest(token: string) {
      console.log('reset');
       this.authService.validateResetRequest(token).subscribe(
         data => {
            console.log('rest request data', data);
                 this.joinRequest = data;
                 this.emailVerification = false;
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
     this.authService.register(register).subscribe(
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
