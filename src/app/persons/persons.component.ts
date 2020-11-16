import { Organisation, Module } from './../core/model/organisation.model';
import { Assign } from './../core/model/assign.model';
import { PersonService } from './../core/services/person.service';
import {Component, OnInit, ViewChild} from '@angular/core';


import { Person } from '../core/model/person.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddPersonComponent } from './add/add-person.component';
import { OrganisationService } from '../core/services/organisation.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.scss']
})
export class PersonsComponent implements OnInit {

  public  nbrs: Array<any> = [1, 2, 3, 4, 5, 7, 8, 9, 10];

  constructor( private modalService: NgbModal, private  personService: PersonService,
    private organisationService: OrganisationService, private route: ActivatedRoute) {
      this.route.data.subscribe(data => {
        this.isStudent  = data.type === 'STAFF' ? false : true;
        this.loadData();
    });

    }

   list = true;

  displayedColumns = [ 'firstName', 'lastName', 'email', 'status', 'department', 'valid'];
  persons: Array<Person>  = [];
  public currentPerson: Person = new Person();
  public departments: Array<Module> = [];
  submitted = false;
  isStudent = null;
  serverError = '';

  total = 0;
  page = 0;
  pageSize = 10;
  pageSizeOptions = [10, 25, 50];

  organisation: Organisation = new Organisation();

  onPageChange(e) {
    this.page = e;
    this.loadData();

  }

  ngOnInit() {
    this.loadData();
    this.loadOrganisation();
  }

  loadData() {
    this.personService.getFiltredPagedPersons(null, this.isStudent, null, this.page, this.pageSize).subscribe(
      data => {
        this.persons =  data.content;
        this.total = data.totalElements;

        this.serverError  = null;
      }
      , error =>  {
        console.log(error);
        this.serverError = error.message;
      }
    );
  }

  refreshWorkload() {
    this.personService.syncAll(null).subscribe(
      data => {
        this.loadData();

        this.serverError  = null;
      }
      , error =>  {
        console.log(error);
        this.serverError = error.message;
      }
    );
  }

  sendInvitation(personId) {
    this.personService.sendInvitation(personId).subscribe(
      data => {

        this.serverError  = null;
      }
      , error =>  {
        console.log(error);
        this.serverError = error.message;
      }
    );
  }

  getPersonInfo() {
    this.personService.getPersonCurrent().subscribe( data => {
     this.currentPerson = data;
     if (this.currentPerson.department) {
      this.departments = this.organisation.departments.filter(d => d.departmentId === this.currentPerson.department.id );
     } else {
      this.departments = this.organisation.departments;
     }

    }, error => {
      console.log(error);
      this.serverError = error.message;
    });
  }


  loadOrganisation() {
    this.organisationService.getOrganisationDetail().subscribe(
      data => {
         this.organisation = data;
         this.getPersonInfo();
      }
      , error => {
        console.log(error);
        this.serverError = error.message;
      }
    );
  }


  public openDialog(person: Person) {
    const modalRef = this.modalService.open(AddPersonComponent);
   // console.log('dd', this.organisation);
    modalRef.componentInstance.departments = this.departments;
    modalRef.componentInstance.person = person;
    modalRef.componentInstance.isStudent = this.isStudent;
     modalRef.result.then((result) => {
         console.log('modal sucess:' + result);
         this.loadData();
         }, (reason) => {
           console.log('modal failed:' + reason);
         }
       );
   }


}

