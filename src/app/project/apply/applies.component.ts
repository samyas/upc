import { P_PROPOSAL } from './../../core/model/project.model';
import { OrganisationService } from 'src/app/core/services/organisation.service';
import { ProjectService } from '../../core/services/project.service';
import { Component, OnInit} from '@angular/core';

import { Apply, Project } from '../../core/model/project.model';
import { switchMap } from 'rxjs/operators';
import { ParamMap, Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { SharedDataService } from 'src/app/core/services/shared-data.service';
import { User } from 'src/app/core/model/auth.model';
import { FileDownloadService } from 'src/app/core/services/file-download.service';
import { AssignMember } from 'src/app/core/model/assign.model';
import { Term } from 'src/app/core/model/organisation.model';
@Component({
  selector: 'app-applies',
  templateUrl: './applies.component.html',
  styleUrls: ['./applies.component.scss']
})
export class AppliesComponent implements OnInit {


  project: Project = new Project();
  serverError = null;
  canAssign = false;
  currentUser: User = new User();
  selectedApplyId = null;
  termMap = {};
  personIds = [];

  constructor(private router: Router, private route: ActivatedRoute,
    private dataService: SharedDataService,  private downloadService: FileDownloadService,
    public projectService: ProjectService, private organisationService: OrganisationService) {
    }

    ngOnInit() {
      this.loadUserProfile();
      this.route.parent.paramMap.pipe(
        switchMap((params: ParamMap) => of(params.get('id')))).subscribe((id) => {
        this.loadProject(id);
      });
    }

    selectApplyId(personId) {
      if (this.selectedApplyId === personId) {
        this.selectedApplyId = null;
      } else {
        this.selectedApplyId = personId;
      }
    }

    loadProject(id: string) {
      this.projectService.getProjectDetail(id).subscribe(
      data => {this.project = data;
      this.canAssign = (this.project.statusCode === P_PROPOSAL.code);
      this.loadTerms(this.project.department.id);
      this.assigned(); },
      error => {console.log(error),  this.serverError = error.message; });
    }


    isAssigned(personId) {
      return (!(this.personIds.find(x => x === personId) === undefined));
    }


   loadUserProfile() {
    this.dataService.currentUser.subscribe(
    data => { this.currentUser = data; },
    error => {console.log(error),  this.serverError = error.message; }
      );
    }

    convertToMap(terms: Array<Term>) {
     terms.forEach( t => this.termMap[t.termId] = t.name);
    }

    assigned() {
      this.project.members.forEach( x => this.personIds.push(x.personId));
      this.project.team.forEach( x => this.personIds.push(x.personId));
    }

    loadTerms(moduleId) {
      this.dataService.currentOrganisationId.subscribe(organisationId =>
        this.organisationService.getModule(organisationId, moduleId).subscribe(
        data => {this.convertToMap(data.supervisorTerms);
         },
         error => {
           console.log(error);
           this.serverError = error.message;
         }));
    }


    download(key: string, fileName: string, contentType: string) {
      this.downloadService.downloadFile(key, fileName, contentType);
    }

    assign(apply: Apply) {
      const assignPerson: AssignMember = new AssignMember();
      assignPerson.termId = apply.termId;
      assignPerson.personId = apply.createdBy.personId;
      this.projectService.assignMember(this.project.projectId, assignPerson).subscribe(
         data => {
           this.serverError = null;
           this.loadProject(this.project.projectId);
         }
         , error =>  {
           console.log('failed to assign supervisor', error);
           this.serverError = error.message;
         }
       );
    }

}
