import { AuthService } from '../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./register.component.scss']
})
export class EmailVerificationComponent implements OnInit {


  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService) {

  }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => of(params.get('token')))).subscribe((token) => {
      this.validate(token);
    });
  }

  validate(token: string) {
    this.authService.validate(token).subscribe(
      data => {
        this.router.navigate(['login/']);
      }
      , error =>  console.log(error)
    );
  }
}
