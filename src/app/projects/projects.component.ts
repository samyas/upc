import { Assign } from './../core/model/assign.model';
import { PersonService } from './../core/services/person.service';
import { ProjectService } from './../core/services/project.service';
import { ShortPerson } from './../core/model/short-person.model';
import { ProjectOverview, Apply } from './../core/model/project.model';
import {Component, OnInit, ViewChild} from '@angular/core';
import { FormControl } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Person } from '../core/model/person.model';
import { ApplyComponent } from './apply/apply.component';

@Component({
  selector: 'app-project',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  public icons = [ 'home', 'person', 'alarm', 'work', 'mail', 'favorite',  'work', 'mail', 'favorite'];
  public  nbrs: Array<any> = [1, 2, 3, 4, 5, 7, 8, 9, 10];

  constructor( private projectService: ProjectService, private  personService: PersonService) { }

  list = true;
  projects: Array<ProjectOverview> = [];
  length = 100;
  pageIndex = 0;
  pageSize = 10;
  pageSizeOptions = [10, 25, 50];
  assign: Boolean = true;
  options: string[] = ['One', 'Two', 'Three'];
  persons: Array<Person> = [];

  onPageChange(e) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.loadData(this.pageIndex, this.pageSize);
  }

  ngOnInit() {
    this.loadData(0, this.pageSize);
    this.loadPersonData();
  }


  public favorite(projectId) {
/*
    const dialogRef = this.dialog.open(ApplyComponent, {
        data: null
    });
    dialogRef.afterClosed().subscribe(applyToSave => {
        if (applyToSave) {
          applyToSave.personId(this.persons[0].id);
          this.apply(projectId, applyToSave);
        }
    });*/
  }

  loadData(page: number, pageSize: number) {
    this.projectService.getPagedProjects(null, null, page, pageSize).subscribe(
      data => {
        this.length = data.totalElements;
        this.projects = data.content;
      }
      , error => alert(error)
    );
  }

  apply(projectId, apply: Apply) {
    this.projectService.apply(projectId, apply).subscribe(
      data => {
        console.log('ssss', data);
      }
      , error => alert(error)
    );
  }

  loadPersonData() {
    this.personService.getPersons().subscribe(
      data => {
        this.persons =  data;
        console.log('ssss', this.persons);
      }
      , error => alert(error)
    );
  }

  onSelectSupervisor(projectId, $event) {
    console.log('supervisor selected', $event.id);
    console.log('test');
    const assignment:  Assign = new Assign();
    assignment.personId = $event.id;
    assignment.action = 'ADD';
    assignment.position = 'SUPERVISOR';
    this.projectService.assign(projectId, assignment).subscribe(
      data => {
        this.loadData(this.pageIndex, this.pageSize);
      }
      , error => alert(error)
    );
  }

  onSelectExecutor(projectId, $event) {
    console.log('execuctor selected', $event.id);
    const assignment:  Assign = new Assign();
    assignment.personId = $event.id;
    assignment.action = 'ADD';
    assignment.position = 'EXAMINATOR';
    this.projectService.assign(projectId, assignment).subscribe(
      data => {
        this.loadData(this.pageIndex, this.pageSize);
      }
      , error => alert(error)
    );
  }


}

const supervisor: ShortPerson = {id: 'ds', firstName: 'Imed', lastName: 'Romdhani', image: 'ss'};
const examinator: ShortPerson = {id: 'ds', firstName: 'Abdessalem', lastName: 'SAMET', image: 'ss'};
const students: ShortPerson[] = [{id: 'ds', firstName: 'Abdessalem', lastName: 'SAMET', image: 'ss'} ,
                                {id: 'ds', firstName: 'Ghada', lastName: 'Fakhfakh', image: 'ss'}];
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

