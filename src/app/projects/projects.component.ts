import { Assign } from './../core/model/assign.model';
import { PersonService } from './../core/services/person.service';
import { ProjectService } from './../core/services/project.service';
import { ShortPerson } from './../core/model/short-person.model';
import { ProjectOverview, Apply, StatusProperties, P_ALL_STATUS } from './../core/model/project.model';
import {Component, OnInit, ViewChild} from '@angular/core';
import { FormControl } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Person } from '../core/model/person.model';

@Component({
  selector: 'app-project',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {


  public  nbrs: Array<any> = [1, 2, 3, 4, 5, 7, 8, 9, 10];
  public statuses: Array<StatusProperties> = [];
  public selectedStatus = [];

  constructor( private projectService: ProjectService, private  personService: PersonService) { }

  assignedToMe = false;

  list = false;
  projects: Array<ProjectOverview> = [];
  assign: Boolean = true;
  persons: Array<Person> = [];
  serverError = null;
  departmentId = null;
  showSpinner = false;

  total = 5;
  page = 0;
  pageSize = 10;
  pageSizeOptions = [10, 25, 50];

  onChangeStatus(e: Array<StatusProperties>) {
    this.selectedStatus = e.map(x => x.code);
    this.loadData();
  }

  refresh(assignedToMe) {
    this.assignedToMe = assignedToMe;
    this.loadData();
  }

  onPageChange(e) {
    this.page = e;
    this.loadData();
  }

  ngOnInit() {
    this.loadData();
    this.loadPersonData();
    this.statuses = P_ALL_STATUS;
  }



  loadData() {
    this.showSpinner = true;
    this.projectService.getPagedProjects(this.selectedStatus, null, this.page, this.pageSize).subscribe(
      data => {
        this.total = data.totalElements;
        this.projects = data.content;
        this.serverError  = null;
        this.showSpinner = false;
      }
      , error =>  {
        console.log(error);
        this.serverError = error.message;
        this.showSpinner = false;
      }
    );

  }

  apply(projectId, apply: Apply) {
    this.projectService.apply(projectId, apply).subscribe(
      data => {
        this.serverError  = null;
      }
      , error => {
        console.log(error);
        this.serverError = error.message;
      }
    );
  }

  delete(projectId) {
    this.projectService.deleteProject(projectId).subscribe(
      data => {
        this.loadData();
      }
      , error => {
        console.log(error);
        this.serverError = error.message;
      }
    );
  }

  loadPersonData() {
    this.personService.getPersons().subscribe(
      data => {
        this.persons =  data;
        this.serverError  = null;
      }
      , error =>  {
        console.log(error);
        this.serverError = error.message;
      }
    );
  }


}

