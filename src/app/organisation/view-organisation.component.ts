import { OrganisationService } from './../core/services/organisation.service';
import { Organisation } from './../core/model/organisation.model';

import {Component, OnInit, ViewChild} from '@angular/core';

import {MatPaginator, MatTableDataSource} from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-organisation',
  templateUrl: './organisation.component.html',
  styleUrls: ['./organisation.component.scss']
})
export class OrganisationComponent implements OnInit {

   organisation: Organisation = new Organisation();

  constructor(public organisationService: OrganisationService) { }
  ngOnInit() {

  }

  load() {
    this.organisationService.getOrganisationDetail().subscribe(
      data => {
         this.organisation = data;
      }
      , error =>  {
        console.log(error);
      }
    );
  }
}
