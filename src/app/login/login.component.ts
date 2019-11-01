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


  constructor(  private router: Router, public fb: FormBuilder) {
        this.form = this.fb.group({
          username: ['', Validators.required],
          password: ['', Validators.required]});
  }

  ngOnInit() {
  }

  login() {
    const userInfo = { name: this.form.value.username, type: this.getType(this.form.value.username) };
    localStorage.setItem('user', JSON.stringify(userInfo));
    console.log('save key', userInfo);
    this.router.navigate(['home/']);
  }

  getType(username: string) {
     if (username.indexOf('1') > 0) {
       return 'MANAGER';
     } else if (username.indexOf('2') > 0) {
       return 'SUPERVISOR';
     }
     return 'STUDENT';
  }
}
