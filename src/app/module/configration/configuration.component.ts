import { Term, Module } from './../../core/model/organisation.model';
import { SharedDataService } from '../../core/services/shared-data.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-inline';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { of } from 'rxjs';
import { switchMap, filter, map } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrganisationService } from 'src/app/core/services/organisation.service';
import { AddTermComponent } from './add-term.component';



@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {

  terms: Array<Term> = [];
  module: Module = new Module();
  public Editor = ClassicEditor;

  error = null;
  moduleId = null;
  public editShow = new EditShow();

  constructor(private router: Router, private route: ActivatedRoute, private organisationService: OrganisationService,
  private modalService: NgbModal, private dataService: SharedDataService
    ) { }

  ngOnInit() {

    this.route.parent.paramMap.pipe(
        switchMap((params: ParamMap) => of(params.get('id')))).subscribe((id) => {
          this.moduleId = id;
        this.loadModule();
      });
  }

  init() {
    this.error = null;
    this.editShow = new EditShow();
  }

 loadModule() {
  this.dataService.currentOrganisationId.subscribe(organisationId =>
         this.organisationService.getModule(organisationId, this.moduleId).subscribe(
         data => {this.terms = data.supervisorTerms; this.module = data; this.init(); },
         error => console.log(error)));
 }

 updateModule() {
  this.dataService.currentOrganisationId.subscribe(organisationId =>
    this.organisationService.updateModule(organisationId, this.module).subscribe(
    data => { this.loadModule(); this.init(); },
    error => console.log(error)));
 }

 deleteTerm(termId) {
  this.dataService.currentOrganisationId.subscribe(organisationId =>
         this.organisationService.deleteTerm(organisationId, this.moduleId, termId).subscribe(
         data => {this.loadModule(); },
         error => console.log(error)));
 }




  public openTermDialog(term: Term) {

    const modalRef = this.modalService.open(AddTermComponent);
    modalRef.componentInstance.moduleId = this.moduleId;
    modalRef.componentInstance.term = term;
    modalRef.result.then((result) => {
        console.log('modal sucess:' + result);
        this.loadModule();
        }, (reason) => {
          console.log('modal failed:' + reason);
        }
      );
  }
}

class EditShow {
  maxTeamNbr: boolean;

  constructor() {
    this.maxTeamNbr = false;
  }

  reset() {
    this.maxTeamNbr = false;
  }
}
