import { SharedDataService } from 'src/app/core/services/shared-data.service';
import { ModuleType, MODULES_TYPE, Module } from './../core/model/organisation.model';
import { AddDepartmentComponent } from './add-department.component';
import { OrganisationService } from './../core/services/organisation.service';

import {Component, OnInit, ViewChild} from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Organisation } from '../core/model/organisation.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Role } from '../core/model/person.model';
import { FileUploaderService } from '../core/services/file-uploader.service';

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
  isAdminCreator = false;
  serverError = null;

  constructor(public organisationService: OrganisationService, public dataService: SharedDataService,
    private  uploadService: FileUploaderService, private modalService: NgbModal) { }
  ngOnInit() {
      this.load();
      this.checkRole();
  }

  load() {
    this.organisationService.getOrganisationDetail().subscribe(
      data => {
         this.organisation = data;
         this.dataService.saveOrganisationId(this.organisation.id);
         this.applyFilter();
      }
      , error =>  {
        this.serverError = error.message;
        console.log(error);
      }
    );
  }

  checkRole() {
    this.dataService.currentUser.subscribe(
    data => {
              if (data.roles.includes(Role.ADMIN_CREATOR)) {
                  this.isAdminCreator = true;
              }
            },
    error => {
      this.serverError = error.message;
     console.log(error);
   });
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

  uploadFile(event) {
    for (let index = 0; index < event.length; index++) {
      const element = event[index];
      this.uploadService.uploadFile(element, element.name, this.organisation.id, 'ORGANISATION')
      .subscribe( data => { this.load(); },
      error => {
        console.log( error);
        this.serverError = error.message;
      });
    }
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
