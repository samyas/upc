import { Component, OnInit } from '@angular/core';
import { Person, UpdatePerson } from '../core/model/person.model';
import { ProjectOverview } from '../core/model/project.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PersonService } from '../core/services/person.service';
import { FileUploaderService } from '../core/services/file-uploader.service';
import { switchMap } from 'rxjs/operators';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-inline';
import { of } from 'rxjs';
import { User } from '../core/model/auth.model';
import { AuthService } from '../core/services/auth.service';
import { SharedDataService } from '../core/services/shared-data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public person: Person = new Person();
  serverError = null;
  userInfo: User = null;
  editShow = new EditShow();
  projects: Array<ProjectOverview> = [];
  skillList = ['IT', 'IOT'];

  public Editor = ClassicEditor;

  constructor(private route: ActivatedRoute, private  personService: PersonService, private  uploadService: FileUploaderService,
    private auhtService: AuthService, private dataService: SharedDataService) { }
  ngOnInit() {
    this. loadUser();
  }
  loadUser() {
    this.auhtService.userInfo().subscribe(
      data => { this.userInfo = data;
        this.dataService.saveUser(this.userInfo);
        this.loadPerson(this.userInfo.personId, true);
      }
      , error =>  {
        this.serverError = error.message;
        console.log(error);
      });
  }

  reset() {
    this.editShow = new EditShow();
    this.serverError = null;
  }

  loadPerson(id, relatedProjects) {
    this.personService.getPersonDetail(id).subscribe(
      data => {
        this.person =  data;
        this.reset();
        if (relatedProjects) {
          this.getRelatedProjects();
        }
      }
      , error =>  {
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

  updatePerson() {
     /*const updatePerson: UpdatePerson = new UpdatePerson();
     updatePerson.id = this.person.id;
     updatePerson.shortDescription = this.person.shortDescription;
     updatePerson.description = this.person.description;
     updatePerson.skills = this.person.skills;*/
    this.personService.updateProfile(this.person).subscribe(
     data => {
       this.reset();
       this.loadPerson(this.person.id, false);
     }
     , error =>  {
       console.log('failed to update person', error);
       this.serverError = error.message;
     }
   );
}

  uploadFile(event) {
    for (let index = 0; index < event.length; index++) {
      const element = event[index];
      this.uploadService.uploadFile(element, element.name, this.person.id, 'PERSON')
      .subscribe( data => { this.loadPerson(this.person.id, false); },
      error => {
        console.log( error);
        this.serverError = error.message;
      });
    }
  }

  addkeyword = (term) => (term);
}

class EditShow {
  shortDescription: boolean;
  description: boolean;
  skills: boolean;

  constructor() {
    this.shortDescription = false;
    this.description = false;
    this.skills = false;
  }

  reset() {
    this.shortDescription = false;
    this.description = false;
    this.skills = false;
  }

}


