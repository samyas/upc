import { Organisation, Department } from './../core/model/organisation.model';
import { Assign } from './../core/model/assign.model';
import { PersonService } from './../core/services/person.service';
import {Component, OnInit, ViewChild} from '@angular/core';


import { Person } from '../core/model/person.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddPersonComponent } from './add/add-person.component';
import { OrganisationService } from '../core/services/organisation.service';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.scss']
})
export class PersonsComponent implements OnInit {

  public icons = [ 'home', 'person', 'alarm', 'work', 'mail', 'favorite',  'work', 'mail', 'favorite'];
  public  nbrs: Array<any> = [1, 2, 3, 4, 5, 7, 8, 9, 10];

  constructor( private modalService: NgbModal, private  personService: PersonService, private organisationService: OrganisationService) { }

   list = true;

  displayedColumns = [ 'firstName', 'lastName', 'email', 'status', 'department', 'valid'];
  persons: Array<Person>  = [];
  public currentPerson: Person = new Person();
  public departments: Array<Department> = [];
  submitted = false;
  serverError = '';

  length = 100;
  pageIndex = 0;
  pageSize = 10;
  pageSizeOptions = [10, 25, 50];
  organisation: Organisation = new Organisation();

  onPageChange(e) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.loadData(this.pageIndex, this.pageSize);

  }

  ngOnInit() {
    this.loadData(0, this.pageSize);
    this.loadOrganisation();
  }

  loadData(page: number, pageSize: number) {
    this.personService.getPagedPersons(null, null, page, pageSize).subscribe(
      data => {
        this.persons =  data.content;
        this.length = data.totalElements;
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
      this.departments = this.organisation.departments.filter(d => d.id === this.currentPerson.department.id );
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
     modalRef.result.then((result) => {
         console.log('modal sucess:' + result);
         this.loadData(0, this.pageSize);
         }, (reason) => {
           console.log('modal failed:' + reason);
         }
       );
   }


}

