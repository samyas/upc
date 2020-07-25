import { FileDownloadService } from 'src/app/core/services/file-download.service';
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
import { ModuleFile } from 'src/app/core/model/file-descriptor.model';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {

  value = 50;
  persons: Array<Person> = [];
  public Editor = ClassicEditor;


  files: Array<ModuleFile> = [];

  error = null;
  moduleId = null;


  constructor(private route: ActivatedRoute, private dataService: SharedDataService,
     private fileUploaderService: FileUploaderService, private fileService: FileDownloadService) { }

  ngOnInit() {
    this.route.parent.paramMap.pipe(
      switchMap((params: ParamMap) => of(params.get('id')))).subscribe((id) => {
        this.moduleId = id;
      this.loadFiles();
    });
  }

  init() {
    this.error = null;
  }

    loadFiles() {
   //   this.dataService.currentOrganisationId.subscribe(organisationId =>
         this.fileService.fileList(this.moduleId).subscribe(
         data => {this.files = data; console.log(this.files); this.init(); },
         error => console.log(error));
     // );
    }

    deleteFile(key) {
      this.fileUploaderService.deleteFile(key, 'MODULE', this.moduleId)
        .subscribe( data => { this.loadFiles(); },
        error => {
          console.log(error);
          this.error = error.message;
        });
    }

    download(key: string, fileName: string, contentType: string) {
      this.fileService.downloadFile(key, fileName, contentType);
    }

}
