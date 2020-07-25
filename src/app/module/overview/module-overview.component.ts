import { FileUploaderService } from './../../core/services/file-uploader.service';
import { Observable } from 'rxjs/Observable';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-inline';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Person } from 'src/app/core/model/person.model';
import { Module } from 'src/app/core/model/organisation.model';
import { OrganisationService } from 'src/app/core/services/organisation.service';
import { SharedDataService } from 'src/app/core/services/shared-data.service';

@Component({
  selector: 'app-module-overview',
  templateUrl: './module-overview.component.html',
  styleUrls: ['./module-overview.component.scss']
})
export class ModuleOverviewComponent implements OnInit {

  value = 50;
  persons: Array<Person> = [];
  public Editor = ClassicEditor;


  module: Module = new Module();

  error = null;

  public editShow = new EditShow();

  constructor(private route: ActivatedRoute, private dataService: SharedDataService, private organisationService: OrganisationService) { }

  ngOnInit() {
    this.route.paramMap.pipe(
        switchMap((params: ParamMap) => of(params.get('id')))).subscribe((id) => {
        this.loadModule(id);
      });
  }

  init() {
    this.error = null;
  }

    loadModule(id: string) {
      this.dataService.currentOrganisationId.subscribe(organisationId =>
         this.organisationService.getModule(organisationId, id).subscribe(
         data => {this.module = data; this.init(); },
         error => console.log(error))
      );
    }


  updateModule() {
    this.organisationService.updateModule(this.dataService.organisationId, this.module)
    .subscribe( data => {
      this.editShow.reset();
      this.loadModule(this.module.departmentId);
    }
    , error => {
      console.log('failed to update module', error);
      this.error = error.message;
    });
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
