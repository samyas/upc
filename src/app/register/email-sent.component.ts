import { AuthService } from '../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-email-sent',
  templateUrl: './email-sent.component.html',
  styleUrls: ['./register.component.scss']
})
export class EmailSentComponent implements OnInit {


  constructor(private router: Router, private authService: AuthService) {

  }

  ngOnInit() {
  }

  shortCut() {
    this.authService.getEmailToken( localStorage.getItem('userId')).subscribe(
      data => {
        this.router.navigate(['register/validate/' + data]);
      }
      , error =>  console.log(error)
    );
  }
}
