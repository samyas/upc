import { AuthService } from './../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShortOrganisation } from '../core/model/auth.model';

@Component({
  selector: 'app-select-organisation',
  templateUrl: './select-organisation.component.html',
  styleUrls: ['./login.component.scss']
})
export class SelectOrganisationComponent implements OnInit {

  organisations: Array<ShortOrganisation> = [];
  selectedTenantId = 0;
  errorMessage = null;

  constructor(  private router: Router, private authService: AuthService) {

  }

  ngOnInit() {
    this.getListOrganisations();
  }

  getListOrganisations() {
    this.authService.getShortOrganisations().subscribe(
      data => {
        this.organisations = data;
      }
      , error =>  console.log(error)
    );
  }

  onChange(event) {
    console.log('ev' , event.target.value);
   this.selectedTenantId = event.target.value;
  }

  next() {
    this.authService.linkToOrganisation(this.selectedTenantId).subscribe(
      authUser => {
        if (authUser.enabled === false) {
          this.errorMessage = 'Your account is not activated by administrator';
          } else {
          this.router.navigate(['home/']);
          }
      }
      , error =>  console.log(error)
    );
  }
}
