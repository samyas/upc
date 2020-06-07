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

  public icons = [ 'home', 'person', 'alarm', 'work', 'mail', 'favorite',  'work', 'mail', 'favorite'];
  public  nbrs: Array<any> = [1, 2, 3, 4, 5, 7, 8, 9, 10];

  public statuses: Array<StatusProperties> = [];

  constructor( private projectService: ProjectService, private  personService: PersonService) { }

  list = false;
  projects: Array<ProjectOverview> = [];
  length = 100;
  pageIndex = 0;
  pageSize = 20;
  pageSizeOptions = [10, 25, 50];
  assign: Boolean = true;
  options: string[] = ['One', 'Two', 'Three'];
  persons: Array<Person> = [];
  serverError = null;
  departmentId = null;


  public from = 1;
  public to = 1;
  public total = 0;
  public isNext = false;
  public isPrevious = false;
  public isNextNext = false;
  public isPreviousPrevious = false;

  onPageChange(e) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.loadData();
  }

  ngOnInit() {
    this.loadData();
    this.loadPersonData();
    this.statuses = P_ALL_STATUS;
  }



  loadData() {
    this.projectService.getPagedProjects(null, null, this.pageIndex, this.pageSize).subscribe(
      data => {
        this.total = data.totalElements;
        this.projects = data.content;
        this.serverError  = null;
      this.from = 1 + (data.number *  this.pageSize);
      this.to = this.from + (data.numberOfElements - 1);
      this.isNext = this.to < this.total;
      this.isPrevious = !(this.from === 1);

      this.isNextNext = (this.to + this.pageSize) < this.total;
      this.isPreviousPrevious = !( (this.from - this.pageSize) <= 1);

      }
      , error =>  {
        console.log(error);
        this.serverError = error.message;
      }
    );

  }

  next() {
    this.pageIndex += 1;
    this.loadData();
  }
  previous() {
    this.pageIndex -= 1;
    this.loadData();
  }

  nextnext() {
    this.pageIndex += 2;
    this.loadData();
  }
  previousprevious() {
    this.pageIndex -= 2;
    this.loadData();
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

  loadPersonData() {
    this.personService.getPersons().subscribe(
      data => {
        this.persons =  data;
        console.log('ssss', this.persons);
      //  this.serverError  = null;
      }
      , error =>  {
        console.log(error);
        this.serverError = error.message;
      }
    );
  }


}

/*
const ELEMENT_DATA: ProjectOverview[] = [
  {projectId: '1', name: 'Chemical Research ', description: 'desc', startDate: '45', endDate: '12',  supervisor:  supervisor,
   examinator: examinator, creator: supervisor, students: students, status: 'NEW', nbrMileStones: 8, nbrTasks: 20,
    nbrCheckPoint: 2, imageId: 'ds', category: 'low', progress: 12},
  {projectId: '2', name: 'Chemical Research ', description: 'desc', startDate: '45', endDate: '12',  supervisor:  supervisor,
   examinator: examinator, creator: supervisor, students: students, status: 'NEW', nbrMileStones: 8, nbrTasks: 20,
    nbrCheckPoint: 2, imageId: 'ds', category: 'low', progress: 12},
    {projectId: '3', name: 'Chemical Research ', description: 'desc', startDate: '45', endDate: '12',  supervisor:  supervisor,
     examinator: examinator, creator: supervisor, students: students, status: 'NEW', nbrMileStones: 8, nbrTasks: 20,
      nbrCheckPoint: 2, imageId: 'ds', category: 'low', progress: 12},
      {projectId: '4', name: 'Chemical Research ', description: 'desc', startDate: '45', endDate: '12',  supervisor:  supervisor,
       examinator: examinator, creator: supervisor, students: students, status: 'NEW', nbrMileStones: 8, nbrTasks: 20,
        nbrCheckPoint: 2, imageId: 'ds', category: 'low', progress: 12},
        {projectId: '5', name: 'Chemical Research ', description: 'desc', startDate: '45', endDate: '12',  supervisor:  supervisor,
         examinator: examinator, creator: supervisor, students: students, status: 'NEW', nbrMileStones: 8, nbrTasks: 20,
          nbrCheckPoint: 2, imageId: 'ds', category: 'low', progress: 12},
          {projectId: '6', name: 'Chemical Research ', description: 'desc', startDate: '45', endDate: '12',  supervisor:  supervisor,
           examinator: examinator, creator: supervisor, students: students, status: 'NEW', nbrMileStones: 8, nbrTasks: 20,
            nbrCheckPoint: 2, imageId: 'ds', category: 'low', progress: 12},
            {projectId: '7', name: 'Chemical Research ', description: 'desc', startDate: '45', endDate: '12',  supervisor:  supervisor,
             examinator: examinator, creator: supervisor, students: students, status: 'NEW', nbrMileStones: 8, nbrTasks: 20,
              nbrCheckPoint: 2, imageId: 'ds', category: 'low', progress: 12},
              {projectId: '8', name: 'Chemical Research ', description: 'desc', startDate: '45', endDate: '12',  supervisor:  supervisor,
               examinator: examinator, creator: supervisor, students: students, status: 'NEW', nbrMileStones: 8, nbrTasks: 20,
                nbrCheckPoint: 2, imageId: 'ds', category: 'low', progress: 12},
                {projectId: '9', name: 'Chemical Research ', description: 'desc', startDate: '45', endDate: '12',  supervisor:  supervisor,
                 examinator: examinator, creator: supervisor, students: students, status: 'NEW', nbrMileStones: 8, nbrTasks: 20,
                  nbrCheckPoint: 2, imageId: 'ds', category: 'low', progress: 12},
           {projectId: '10', name: 'Chemical Research ', description: 'desc', startDate: '45', endDate: '12',  supervisor:  supervisor,
                   examinator: examinator, creator: supervisor, students: students, status: 'NEW', nbrMileStones: 8, nbrTasks: 20,
                    nbrCheckPoint: 2, imageId: 'ds', category: 'low', progress: 12}

];*/

