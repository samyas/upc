import { Term } from './../../core/model/organisation.model';
import { SharedDataService } from 'src/app/core/services/shared-data.service';
import { FileUploaderService } from './../../core/services/file-uploader.service';
import { Observable } from 'rxjs/Observable';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Component, OnInit } from '@angular/core';
import { ProjectService } from './../../core/services/project.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Project, Member, PROJECT_STATUS_FLOWS, StatusProperties } from './../../core/model/project.model';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonService } from 'src/app/core/services/person.service';
import { Person } from 'src/app/core/model/person.model';
import { FileDownloadService } from 'src/app/core/services/file-download.service';
import { OrganisationService } from 'src/app/core/services/organisation.service';
import { AssignPersonsComponent } from '../assign/assign-persons.component';
import { User } from 'src/app/core/model/auth.model';



// import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';


@Component({
  selector: 'app-project-overview',
  templateUrl: './project-overview.component.html',
  styleUrls: ['./project-overview.component.scss']
})
export class ProjectOverviewComponent implements OnInit {

  persons: Array<Person> = [];
  public Editor = ClassicEditor;

  terms: Array<Term> = [];
  // <img imgViewer [id]="consultant.photoFileId" default="../assets/img/avatar5.png" class="profile-user-img img-responsive img-circle"/>
  // <input type="file" id="photo-anchor" (change)="onChangePhoto()" ng2FileSelect [uploader]="photoUploader" />
  // public uploader:FileUploader = new FileUploader({});

  project: Project = new Project();
  currentUser: User = new User();
  userMember: Member = null;
  error = null;
  showSign = null;
  public editShow = new EditShow();
  termWithmembers: Array<Member> = [];
  actions: Array<StatusProperties> = [];

  constructor(private route: ActivatedRoute, private projectService: ProjectService,
    private  personService: PersonService, private modalService: NgbModal,
    private organisationService: OrganisationService, private dataService: SharedDataService,
    private  uploadService: FileUploaderService, private downloadService: FileDownloadService
    ) { }

  ngOnInit() {
    this.route.paramMap.pipe(
        switchMap((params: ParamMap) => of(params.get('id')))).subscribe((id) => {
        this.loadProject(id);
      });
  }


 loadModuleIfNeeded(moduleId) {
  if ( this.terms.length === 0) {
  this.dataService.currentOrganisationId.subscribe(organisationId =>
         this.organisationService.getModule(organisationId, moduleId).subscribe(
         data => {this.terms = data.supervisorTerms;
          this.termWithmembers = this.mapTermsWithMembers(this.terms, this.project.members);
          this.init(); },
          error => {
            console.log(error);
            this.error = error.message;
          }));
  } else {
    this.termWithmembers = this.mapTermsWithMembers(this.terms, this.project.members);
  }
 }

  init() {
    this.error = null;
  }

  refreshNextStatus() {
    this.actions = PROJECT_STATUS_FLOWS.find(x => x.current.code === this.project.statusCode).next;
  }

   loadProject(id: string) {
   // this.dataService.currentUser.subscribe( u => {this.currentUser = u;
         this.projectService.getProjectDetail(id).subscribe(
         data => {this.project = data; this.refreshNextStatus(); this.loadModuleIfNeeded(this.project.department.id);
          this.loadUserProfile(); this.init(); },
         error => {
          console.log(error);
          this.error = error.message;
        });
      // });
   }

   loadUserProfile() {
    this.dataService.currentUser.subscribe(
    data => {this.currentUser = data;  this.syncProjectWithUser(); },
    error => {
     console.log(error);
   });
}

 syncProjectWithUser() {
   console.log('sync user');
   this.userMember = this.project.members.find(x => x.personId === this.currentUser.personId);
   if (!this.userMember ) {
     this.userMember  = this.project.team.find(x => x.personId === this.currentUser.personId);
   }
 }

   changeStatus(status: string) {
    this.projectService.changeStatus(this.project.projectId, status).subscribe(
      data => { this.loadProject(this.project.projectId); },
      error => {
        console.log( error);
        this.error = error.message;
      });
   }

   sign() {
    this.projectService.sign(this.project.projectId, this.userMember.termId ? 'members' : 'team').subscribe(
      data => { this.loadProject(this.project.projectId); },
      error => {
        console.log( error);
        this.error = error.message;
      });
   }

   mapTermsWithMembers(terms: Array<Term>, members: Array<Member>) {
    return terms.map(t => this.convertTerm(t, members));
   }

  convertTerm(term: Term, members: Array<Member>): Member {
    const termWithmember = new Member();
    termWithmember.termId = term.termId;
    termWithmember.termName = term.name;
    const matchingMembers = members.filter(d => d.termId === term.termId);
    if (matchingMembers.length === 1) {
      termWithmember.firstName =  matchingMembers[0].firstName;
      termWithmember.lastName =  matchingMembers[0].lastName;
      termWithmember.personId =  matchingMembers[0].personId;
      termWithmember.imageId =  matchingMembers[0].imageId;
      termWithmember.signed = matchingMembers[0].signed;
    }
    return termWithmember;
  }


  public openAssignPersonsDialog(member: Member) {

    const modalRef = this.modalService.open(AssignPersonsComponent);
    const term: Term = new Term();
    term.name = member.termName;
    term.termId = member.termId;
    modalRef.componentInstance.projectId = this.project.projectId;
    modalRef.componentInstance.term = term;
    modalRef.componentInstance.student = false;
    modalRef.result.then((result) => {
        console.log('modal sucess:' + result);
        this.loadProject(this.project.projectId);
        }, error => {
          console.log('failed to assign project', error);
          this.error = error.message;
        }
      );
  }

  public openAssignTeamDialog() {

    const term: Term = new Term();
    term.name = 'Team';
    term.termId = null;
    const modalRef = this.modalService.open(AssignPersonsComponent);
    modalRef.componentInstance.student = true;
    modalRef.componentInstance.projectId = this.project.projectId;
    modalRef.componentInstance.term = term;
    modalRef.result.then((result) => {
        console.log('modal sucess:' + result);
        this.loadProject(this.project.projectId);
        }, (reason) => {
          console.log('modal failed:' + reason);
        }
      );
  }

  public unAssignSupervisor(member: Member) {
      this.projectService.unAssignSupervisor(this.project.projectId, member.personId)
      .subscribe( data => {
        this.loadProject(this.project.projectId);
      }
      , error => {
        console.log('failed to unassign project', error);
        this.error = error.message;
      });
  }

  public unAssignTeam(member: Member) {
    this.projectService.unAssignTeam(this.project.projectId, member.personId)
    .subscribe( data => {
      this.loadProject(this.project.projectId);
    }
    , error => {
      console.log('failed to unassign project', error);
      this.error = error.message;
    });
  }



  updateProject() {
    this.projectService.updateProject(this.project)
    .subscribe( data => {
      this.editShow.reset();
      this.loadProject(this.project.projectId);
    }
    , error => {
      console.log('failed to update project', error);
      this.error = error.message;
    });
  }


  uploadFile(event) {
    for (let index = 0; index < event.length; index++) {
      const element = event[index];
      this.uploadService.uploadFile(element, element.name, this.project.projectId, 'PROJECT')
      .subscribe( data => { this.loadProject(this.project.projectId); },
      error => {
        console.log( error);
        this.error = error.message;
      });
    }
  }
  deleteAttachment(key) {
    this.uploadService.deleteFile(key, 'PROJECT', this.project.projectId)
      .subscribe( data => { this.loadProject(this.project.projectId); },
      error => {
        console.log(error);
        this.error = error.message;
      });
  }

  download(key: string, fileName: string, contentType: string) {
    this.downloadService.downloadFile(key, fileName, contentType);
  }


}

class EditShow {
  title: boolean;
  shortDescription: boolean;
  description: boolean;

  constructor() {
    this.title = false;
    this.shortDescription = false;
    this.description = false;
  }

  reset() {
    this.title = false;
    this.shortDescription = false;
    this.description = false;
  }
}
