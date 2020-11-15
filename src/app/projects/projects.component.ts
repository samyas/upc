import { Assign } from './../core/model/assign.model';
import { PersonService } from './../core/services/person.service';
import { ProjectService } from './../core/services/project.service';
import { ShortPerson } from './../core/model/short-person.model';
import { ProjectOverview, Apply, StatusProperties, P_ALL_STATUS } from './../core/model/project.model';
import {Component, OnInit, ViewChild} from '@angular/core';
import { FormControl } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Person, Role } from '../core/model/person.model';
import { SharedDataService } from '../core/services/shared-data.service';
import { User } from '../core/model/auth.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {


  public  nbrs: Array<any> = [1, 2, 3, 4, 5, 7, 8, 9, 10];
  public statuses: Array<StatusProperties> = [];
  public selectedStatus = [];

  constructor(private route: ActivatedRoute, private projectService: ProjectService, private dataService: SharedDataService) { }

  assignedToMe = false;

  list = false;
  projects: Array<ProjectOverview> = [];
  assign: Boolean = true;
  serverError = null;
  departmentId = null;
  showSpinner = false;
  currentUser: User = new User();

  isModelLeader = null;

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
    this.statuses = P_ALL_STATUS;
    this.loadUserProfile().subscribe(
      data => {
        if (this.isAdminCreator()) {
          this.route.queryParams.subscribe(params => {this.departmentId = params.departmentId; this.loadData(); });
        } else {
          this.loadData();
        }
      }
      , error => {
        console.log(error);
        this.serverError = error.message;
      }
    );

  }


  loadUserProfile(): Observable<User> {
    return this.dataService.currentUser.pipe(map( data  => {
    this.currentUser = data;
    return data;
    }));
  }

  public isModuleLeader() {
    return this.currentUser?.roles?.includes(Role.MODULE_LEADER);
  }
  public isStaff() {
      return this.currentUser?.roles?.includes(Role.STAFF);
  }
  public isStudent() {
      return this.currentUser?.roles?.includes(Role.STUDENT);
  }
  public  isAdminCreator() {
      return this.currentUser?.roles?.includes(Role.ADMIN_CREATOR);
  }

  loadData() {
    this.showSpinner = true;
    this.projectService.getPagedProjects(this.selectedStatus, this.assignedToMe, this.departmentId, this.page, this.pageSize).subscribe(
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
  getStyle(statusCode) {
   return  statusCode === 'progress' ? 'progress-s' : statusCode;
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

}

