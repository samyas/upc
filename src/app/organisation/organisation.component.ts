import { AddDepartmentComponent } from './add-department.component';
import { OrganisationService } from './../core/services/organisation.service';

import {Component, OnInit, ViewChild} from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Organisation } from '../core/model/organisation.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-organisation',
  templateUrl: './organisation.component.html',
  styleUrls: ['./organisation.component.scss']
})
export class OrganisationComponent implements OnInit {

  organisation: Organisation = new Organisation();
  public form: FormGroup;
  submitted = false;

  constructor(public organisationService: OrganisationService,
      private modalService: NgbModal) { }
  ngOnInit() {
      this.load();
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

  public openDialog() {
   const modalRef = this.modalService.open(AddDepartmentComponent);
    modalRef.componentInstance.organisationId = this.organisation.id;
    modalRef.result.then((result) => {
        console.log('modal sucess:' + result);
        this.load();
        }, (reason) => {
          console.log('modal failed:' + reason);
        }
      );
  }
}
