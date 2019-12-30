import { AuthService } from './../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Register } from '../core/model/auth.model';
import { MustMatch } from '../core/validators/must-match.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;
  submitted = false;
  serverError = '';


  constructor(  private router: Router, private authService: AuthService, public formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        isCreator: [false],
        message: null
    }, {
      validator: MustMatch('password', 'confirmPassword')
  });
}

next() {
  this.router.navigate(['register/email-sent']);
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
         localStorage.setItem('userId', data);
         this.router.navigate(['register/email-sent']);
      }
      , error =>  {
        console.log(error);
        this.serverError = error.message;
      }
    );
 }
}
