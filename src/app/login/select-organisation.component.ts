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

  onSelection(event) {
    console.log('ev' , event);
   this.selectedTenantId = event.tenantId;
  }

  next() {
    this.authService.linkToOrganisation(this.selectedTenantId).subscribe(
      data => {
        this.router.navigate(['home/']);
      }
      , error =>  console.log(error)
    );
  }
}
