import { ApplyComponent } from './../apply/apply.component';
import { Term } from './../../core/model/organisation.model';
import { SharedDataService } from 'src/app/core/services/shared-data.service';
import { FileUploaderService } from './../../core/services/file-uploader.service';
import { Observable } from 'rxjs/Observable';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-inline';
import { Component, OnInit } from '@angular/core';
import { ProjectService } from './../../core/services/project.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Project, Member, PROJECT_STATUS_FLOWS,
  StatusProperties, P_PROPOSAL, P_ASSIGNED, Apply, EditProject, DiffDays } from './../../core/model/project.model';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Person, Role } from 'src/app/core/model/person.model';
import { FileDownloadService } from 'src/app/core/services/file-download.service';
import { AssignPersonsComponent } from '../assign/assign-persons.component';
import { User } from 'src/app/core/model/auth.model';
import { CurrentUserInfo } from '../user-project.model';


@Component({
  selector: 'app-project-overview',
  templateUrl: './project-overview.component.html',
  styleUrls: ['./project-overview.component.scss']
})
export class ProjectOverviewComponent implements OnInit {


  public Editor = ClassicEditor;

  project: Project = new Project();
  currentUser = new  CurrentUserInfo();
  actions: Array<StatusProperties> = [];
  canAssign = false;
  editRender = new EditRender();
  applyRender = new ApplyRender();

  error = null;
  errorEdit = null;

  constructor(private route: ActivatedRoute, private projectService: ProjectService,
    private modalService: NgbModal, private dataService: SharedDataService,
    private  uploadService: FileUploaderService, private downloadService: FileDownloadService,
    private router: Router,
    ) { }

  ngOnInit() {
    this.route.paramMap.pipe(
        switchMap((params: ParamMap) => of(params.get('id')))).subscribe((id) => {
          this.dataService.currentUser.subscribe(
            data => {
              this.currentUser.user = data;
              this.loadProject(id);
            },
            error => {console.log(error); }
           );
      });
  }


   loadProject(id: string) {
         this.projectService.getProjectDetail(id).subscribe(
         data => {this.project = data; this.refresh(); },
         error => {
          this.error = error.message;
        });
   }


   refresh() {
              this.isConnectedUserAmemberOfTheProject();
              this.renderDiff();
              this.renderAssign();
              this.renderApply();
              this.renderNexActions();
              this.error = null;
              this.errorEdit = null;
   }

    isConnectedUserAmemberOfTheProject() {
      this.currentUser.projectMember = this.project.members.find(x => x.personId === this.currentUser.personId);
      if (! this.currentUser.projectMember ) {
        this.currentUser.projectMember  = this.project.team.find(x => x.personId === this.currentUser.personId);
      }
       this.currentUser.isFirstSupervisor =  this.project.members[0].personId === this.currentUser.personId;
       this.currentUser.isCreator = this.currentUser.personId === this.project.creator.personId;
    }

  /******************** DIFF Date RENDERING **********************/
  renderDiff() {
    console.log('kkk', this.getMonthDiff(this.project.startDate, this.project.endDate));
     this.project.diff = this.getMonthDiff(this.project.startDate, this.project.endDate);
     console.log('ttt', this.project.diff);
  }

 /***************************ASSIGN RENDERING*********************/
    renderAssign() {
      if (this.project.statusCode === P_PROPOSAL.code) {
          if (this.currentUser.isModelLeader() || this.currentUser.isFirstSupervisor) {
                this.canAssign = true;
          }
      }
    }

    canAssignFirstSupervisor() {
      if (this.project.statusCode === P_PROPOSAL.code) {
        if ( !this.project.members[0].personId && this.currentUser.isCreator) {
          return true;
        }
      }
    }

/***************************NEXT ACTIONS RENDERING*********************/
    renderNexActions() {
      const next: Array<StatusProperties> = PROJECT_STATUS_FLOWS.find(x => x.current.code === this.project.statusCode)?.next;
      if (next) {
        this.actions = next.filter(x => x.roles.includes(this.currentUser.roles[0]));
        if (this.project.statusCode === P_PROPOSAL.code) {
          if (!(this.project.members[0].personId) ||  !(this.project.team) || this.project.team.length === 0) {
            this.actions = this.actions.filter( x => x.code !== P_ASSIGNED.code);
          }
        }
      }
    }

   /*******************APPLY RENDERING *******************************/

    renderApply() {
      this.applyRender.showApply = this.canApply();
      this.applyRender.showAlreadyApplied = this.showAlreadyApplied();
    }

    canApply() {
      if (!this.currentUser.isMember &&  !this.alreadyApplied() && this.project.statusCode === P_PROPOSAL.code) {
        if (this.currentUser.roles.includes(Role.STUDENT)) {
           return  this.project.team.length < this.project.maxTeamMembers;
        } else  { // Staff
              return this.getEmtyPositions().length > 0;
        }
      }
      return false;
    }

    alreadyApplied() {
      return (this.project.applies.find(x => x.createdBy.personId ===   this.currentUser.personId));
    }

    showAlreadyApplied() {
      return !this.currentUser.isMember &&  this.alreadyApplied() && this.project.statusCode === P_PROPOSAL.code;
    }

    getEmtyPositions() {
      return this.project.members.filter(x => !x.personId).map( m => {
        const term = new Term();
        term.termId = m.termId;
        term.name = m.termName;
        return term;
      });
    }


    /*******************ACTIONS********************************* */
    // APPLY
    apply() {

      const modalRef = this.modalService.open(ApplyComponent,  {windowClass: 'xlModal'});
      modalRef.componentInstance.projectId = this.project.projectId;

      if (this.currentUser.roles.includes(Role.STUDENT)) {
        modalRef.componentInstance.terms = [];
      } else {
        modalRef.componentInstance.terms = this.getEmtyPositions();
      }
      modalRef.result.then((result) => {
          this.loadProject(this.project.projectId);
          }, (reason) => {
            console.log('modal failed:' + reason);
          }
        );
     }

   // Change Project status
   changeStatus(status: string) {
    this.projectService.changeStatus(this.project.projectId, status).subscribe(
      data => { this.loadProject(this.project.projectId); },
      error => {
        console.log( error);
        this.error = error.message;
      });
   }

   // Assign
   sign() {
    this.projectService.sign(this.project.projectId, this.currentUser.projectMember.termId ? 'members' : 'team').subscribe(
      data => { this.loadProject(this.project.projectId); },
      error => {
        console.log( error);
        this.error = error.message;
      });
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
        this.loadProject(this.project.projectId);
        }, error => {
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
        this.error = error.message;
      });
  }

  public unAssignTeam(member: Member) {
    this.projectService.unAssignTeam(this.project.projectId, member.personId)
    .subscribe( data => {
      this.loadProject(this.project.projectId);
    }
    , error => {
      this.error = error.message;
    });
  }


  // Update Project
  updateProject() {
    const editProject = new EditProject();
    editProject.projectId = this.project.projectId;
    editProject.description = this.project.description;
    editProject.shortDescription = this.project.shortDescription;
    editProject.startDate = this.project.startDate;
    editProject.endDate = this.project.endDate;
    editProject.keywords = this.project.keywords;
    editProject.departmentId = this.project.department.id;
    this.projectService.updateProject(editProject)
    .subscribe( data => {
      this.editRender.reset();
      this.loadProject(this.project.projectId);
    }
    , error => {
      this.errorEdit = error.message;
    });
  }


  uploadLogo(event) {
    for (let index = 0; index < event.length; index++) {
      const element = event[index];
      this.uploadService.uploadFile(element, element.name, this.project.projectId, 'PROJECT_LOGO')
      .subscribe( data => { this.loadProject(this.project.projectId); },
      error => {
        this.error = error.message;
      });
    }
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
        this.error = error.message;
      });
  }

  download(key: string, fileName: string, contentType: string) {
    this.downloadService.downloadFile(key, fileName, contentType);
  }

  // Delete Project
  public delete() {
    this.projectService.delete(this.project.projectId)
    .subscribe( data => {
      this.router.navigate(['home/project']);
    }
    , error => {
      this.error = error.message;
    });
  }

  public getMonthDiff(startDateObject, endDateObject) {
    const startDate = new Date(startDateObject);
    const endDate = new Date(endDateObject);
   /* const monthsFromYearDiff = (startDate.getFullYear() - endDate.getFullYear()) * 12;
    const monthsFromMonthDiff = startDate.getMonth() - endDate.getMonth();
    let dayDiff = startDate.getDate() - endDate.getDate();
    let monthDiff = null;
    if (dayDiff < 0) {
      // means startDate is not a complete month
      // get last day of month
      const d = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
      const numDays = d.getDate();
      dayDiff += numDays;
       monthDiff =  monthsFromYearDiff + monthsFromMonthDiff - 1;
       console.log('vv', monthDiff, dayDiff);
       return new DiffDays(monthDiff, dayDiff);
    }
    monthDiff = monthsFromYearDiff + monthsFromMonthDiff;
    console.log('ss', monthDiff, dayDiff);
    return new DiffDays(monthDiff, dayDiff);*/
    const time = (startDate.getTime() - endDate.getTime()) / 1000;
    const year  = Math.abs(Math.round((time / (60 * 60 * 24)) / 365.25));
    const month = Math.abs(Math.round(time / (60 * 60 * 24 * 7 * 4)));
    const days = Math.abs(Math.round(time / (3600 * 24)));
    return new DiffDays(month, days);
  }

}

class ApplyRender {
   showApply: boolean;
   showAlreadyApplied: boolean;

   constructor() {
    this.showApply = false;
    this.showAlreadyApplied = false;
  }
}


class EditRender {
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
