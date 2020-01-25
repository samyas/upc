import { AuthService } from './../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;


  constructor(  private router: Router, public fb: FormBuilder , private authService: AuthService) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]});
  }

  login() {
    console.log(this.authService);
    const username = this.form.value.username;
    const password = this.form.value.password;
  this.authService.login(username, password).subscribe(
      authUser => {
        if (authUser.needToSelect === false) {
          if (authUser.needToInitOrg === true) {
            this.router.navigate(['login/init-organisation/']);
          } else {
            this.router.navigate(['home/']);
          }
        } else {
          this.router.navigate(['login/choose-organisation/']);
        }
      }
      , error =>  console.log(error)
    );
  }

  getLoginInfo() {
    this.authService.userInfo().subscribe(
      user => {
           if (user.hasNoTenants()) {
            this.router.navigate(['select-organisation/']);
           } else  if (user.enabled === false) {
            this.router.navigate(['not-enabled/']);
           } else  if (user.defaultTenantId !== 0) {
            this.router.navigate(['home/']);
           } else  if (user.defaultTenantId !== 0) {
            this.router.navigate(['home/']);
           }
      }
      , error => console.error(error)
    );
  }
}
