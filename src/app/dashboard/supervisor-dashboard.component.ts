import { PersonService } from 'src/app/core/services/person.service';
import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../core/services/project.service';
import { ProjectOverview, StatusProperties, P_ALL_STATUS } from '../core/model/project.model';
import { Person, Role } from '../core/model/person.model';

import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, MultiDataSet } from 'ng2-charts';
import { SharedDataService } from '../core/services/shared-data.service';
import { User } from '../core/model/auth.model';

@Component({
  selector: 'app-supervisor-dashboard',
  templateUrl: './supervisor-dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class SupervisorDashboardComponent implements OnInit {

  doughnutChartLabels: Label[] = ['Action 1', 'Action 2', 'Action 3'];
  doughnutChartData: MultiDataSet = [
    [55, 25, 20]
  ];
  doughnutChartType: ChartType = 'doughnut';

  projects: Array<ProjectOverview> = [];
  totalProjects = 0;
  pageProject = 0;

  persons: Array<Person>  = [];
  totalPersons = 0;
  pagePerson = 0;

  serverError = null;
  departmentId = null;
  isStudent = false;


  pageSize = 5;
  pageSizeOptions = [10, 25, 50];
  public statuses: Array<StatusProperties> = [];

  currentUser: User = new User();

  isAdmin = null;
  isModuleLeader = null;

  constructor(private projectService: ProjectService, private personService: PersonService,
    private dataService: SharedDataService,
    ) { }

  ngOnInit() {
    this.loadUserProfile();
    this.statuses = P_ALL_STATUS;
  }

  loadUserProfile() {
    this.dataService.currentUser.subscribe(
    data => {
              this.currentUser = data;
              if ( this.currentUser.roles.includes(Role.STAFF) || this.currentUser.roles.includes(Role.STUDENT)) {
                this.isAdmin = false;
                this.getRelatedProjects(this.currentUser.personId);
              } else if (this.currentUser.roles.includes(Role.MODULE_LEADER)) {
                this.isModuleLeader = true;
                this.loadDataProjects();
                this.loadDataPersons();
                this.isAdmin = true;
              } else {
                this.isAdmin = true;
              //  this.loadDataProjects();
                this.loadDataPersons();
              }
            },
    error => {
     console.log(error);
   });
  }


  onPageChangeProject(e) {
    this.pageProject = e;
    this.loadDataProjects();
  }

  onPageChangePerson(e) {
    this.pagePerson = e;
    this.loadDataPersons();
  }

  onChangeStudents(student) {
    this.isStudent = student;
    this.loadDataPersons();
  }



  loadDataProjects() {
    this.projectService.getPagedProjectsWithGoals(null, null, this.pageProject, this.pageSize).subscribe(
      data => {
        this.totalProjects = data.totalElements;
        this.projects = data.content;
        this.serverError  = null;
      }
      , error =>  {
        console.log(error);
        this.serverError = error.message;
      }
    );

  }

  loadDataPersons() {
    this.personService.getFiltredPagedPersons(null, this.isStudent, null, this.pagePerson, this.pageSize).subscribe(
      data => {
        this.persons =  data.content;
        this.totalPersons = data.totalElements;

        this.serverError  = null;
      }
      , error =>  {
        console.log(error);
        this.serverError = error.message;
      }
    );
  }

  getRelatedProjects(personId) {
    this.personService.getPersonProjects(personId).subscribe(
      data => {
        this.projects =  data;
        this.serverError  = null;
      }
      , error =>  {
        console.log(error);
        this.serverError = error.message;
      }
    );
  }



}
