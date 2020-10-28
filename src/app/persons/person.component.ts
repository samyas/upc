
import { PersonService } from '../core/services/person.service';
import {Component, OnInit} from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Person } from '../core/model/person.model';
import { ProjectOverview, Goal } from '../core/model/project.model';
import { FileUploaderService } from '../core/services/file-uploader.service';


@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./persons.component.scss']
})
export class PersonComponent implements OnInit {

  public person: Person = new Person();
  serverError = null;
  editShow = new EditShow();
  projects: Array<ProjectOverview> = [];

  constructor(private route: ActivatedRoute, private  personService: PersonService, private  uploadService: FileUploaderService) { }
  ngOnInit() {
    this.route.paramMap.pipe(
        switchMap((params: ParamMap) => of(params.get('id')))).subscribe((id) => {
        this.loadPerson(id);
      });
  }

  loadPerson(id) {
    this.personService.getPersonDetail(id).subscribe(
      data => {
        this.person =  data;
        this.serverError  = null;
        this.getRelatedProjects();
      }
      , error =>  {
        console.log(error);
        this.serverError = error.message;
      }
    );
  }


  getRelatedProjects() {
    this.personService.getPersonProjects(this.person.id).subscribe(
      data => {
        this.projects =  data;
        this.serverError  = null;
      }
      , error =>  {
        console.log(error);
        this.serverError = error.message;
      }
    );
  }

  uploadFile(event) {
    for (let index = 0; index < event.length; index++) {
      const element = event[index];
      console.log('tetet');
      this.uploadService.uploadFile(element, element.name, this.person.id, 'PERSON')
      .subscribe( data => { this.loadPerson(this.person.id); },
      error => {
        console.log( error);
        this.serverError = error.message;
      });
    }
  }

}

class EditShow {
  shortDescription: boolean;
  description: boolean;

  constructor() {
    this.shortDescription = false;
    this.description = false;
  }

  reset() {
    this.shortDescription = false;
    this.description = false;
  }
}
