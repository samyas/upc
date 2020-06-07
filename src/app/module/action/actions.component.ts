import { SharedDataService } from './../../core/services/shared-data.service';
import { Action } from './../../core/model/organisation.model';
import { FileUploaderService } from '../../core/services/file-uploader.service';
import { Observable } from 'rxjs/Observable';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, NavigationStart } from '@angular/router';
import { of } from 'rxjs';
import { switchMap, filter, map } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonService } from 'src/app/core/services/person.service';
import { Person } from 'src/app/core/model/person.model';
import { FileDownloadService } from 'src/app/core/services/file-download.service';
import { OrganisationService } from 'src/app/core/services/organisation.service';
import { AddActionComponent } from './add-action.component';



@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {

  public icons = [ 'home', 'person', 'alarm', 'work', 'mail', 'favorite'];
  public colors = [ 'accent', 'primary', 'warn' ];
  color = 'primary';
  mode = 'determinate';
  value = 50;
  actions: Array<Action> = [];
  public Editor = ClassicEditor;

  error = null;

  showDescriptionEditor = false;
  showShortDescriptionEditor = false;
  moduleId = null;
  selectedActionId = null;

  public editShow = new EditShow();

  constructor(private router: Router, private route: ActivatedRoute, private organisationService: OrganisationService,
    private  personService: PersonService, private modalService: NgbModal, private dataService: SharedDataService,
    private  uploadService: FileUploaderService, private downloadService: FileDownloadService
    ) { }

  ngOnInit() {

    this.route.parent.paramMap.pipe(
        switchMap((params: ParamMap) => of(params.get('id')))).subscribe((id) => {
          this.moduleId = id;
        this.loadActions();
      });
  }

  init() {
    this.error = null;
  }

  download(key: string, fileName: string, contentType: string) {
    this.downloadService.downloadFile(key, fileName, contentType);
  }

 loadActions() {
  this.dataService.currentOrganisationId.subscribe(organisationId =>
         this.organisationService.getActions(organisationId, this.moduleId).subscribe(
         data => {this.actions = data; this.init(); },
         error => console.log(error)));
 }

 deleteAction(actionId) {
  this.dataService.currentOrganisationId.subscribe(organisationId =>
         this.organisationService.deleteAction(organisationId, this.moduleId, actionId).subscribe(
         data => {this.loadActions(); },
         error => console.log(error)));
 }

 selectAction(taskId: string) {
  if (this.selectedActionId === taskId) {
    this.selectedActionId = null;
  } else {
    this.selectedActionId = taskId;
  }
}


  public openActionDialog(action: Action) {

    const modalRef = this.modalService.open(AddActionComponent);
    modalRef.componentInstance.moduleId = this.moduleId;
    modalRef.componentInstance.action = action;
    modalRef.result.then((result) => {
        console.log('modal sucess:' + result);
        this.loadActions();
        }, (reason) => {
          console.log('modal failed:' + reason);
        }
      );
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
