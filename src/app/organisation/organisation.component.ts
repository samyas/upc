import { SharedDataService } from 'src/app/core/services/shared-data.service';
import { ModuleType, MODULES_TYPE, Module } from './../core/model/organisation.model';
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
  selectedModuleType: ModuleType = null;
  moduleTypes: Array<ModuleType> = MODULES_TYPE;
  departments: Array<Module> = [];

  constructor(public organisationService: OrganisationService, public dataService: SharedDataService,
      private modalService: NgbModal) { }
  ngOnInit() {
      this.load();
  }

  load() {
    this.organisationService.getOrganisationDetail().subscribe(
      data => {
         this.organisation = data;
         this.dataService.saveOrganisationId(this.organisation.id);
         this.applyFilter();
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

  setCurrentModuleType(type: ModuleType) {
     this.selectedModuleType = type;
     this.applyFilter();
  }

  applyFilter() {
    if (this.selectedModuleType) {
      this.departments = this.organisation.departments.filter(d => d.type === this.selectedModuleType);
    } else {
      this.departments = this.organisation.departments;
    }
  }
}
