import { Component, OnInit } from '@angular/core';
import { Person } from '../core/model/person.model';
import { ProjectOverview } from '../core/model/project.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PersonService } from '../core/services/person.service';
import { FileUploaderService } from '../core/services/file-uploader.service';
import { switchMap } from 'rxjs/operators';
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

  constructor(private route: ActivatedRoute, private  personService: PersonService, private  uploadService: FileUploaderService,
    private auhtService: AuthService, private dataService: SharedDataService) { }
  ngOnInit() {
    this. loadUser();
  }
  loadUser() {
    this.auhtService.userInfo().subscribe(
      data => { this.userInfo = data;
        this.dataService.saveUser(this.userInfo);
        this.loadPerson(this.userInfo.personId);
      }
      , error =>  {
        console.log(error);
      });
  }


  loadPerson(id) {
    this.personService.getPersonDetail(id).subscribe(
      data => {
        this.person =  data;
        this.person.skills = ['IT', 'Network', 'IP'];
        if (!this.person.shortDescription) {
          this.person.shortDescription = '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quis accumsan mi. Nam nulla lorem, consectetur eu augue nec, laoreet viverra augue. Curabitur quis nisi nec enim tempor tincidunt sit amet eu elit. Aliquam metus massa, vehicula vel nisi quis, eleifend hendrerit velit. Maecenas nunc nunc, ultricies non accumsan sit amet, varius non dui. Pellentesque ipsum justo, mollis et posuere at, viverra porta nisl. Cras accumsan cursus tellus luctus congue. Maecenas sed feugiat dolor. In ipsum sapien, congue vitae congue ac, cursus nec mauris. Integer fringilla mi urna, id efficitur ligula interdum quis. Ut vehicula imperdiet elit, quis condimentum est aliquam ac. Nunc tortor elit, imperdiet ac tellus ut, accumsan interdum dui. Duis fermentum tincidunt massa, sodales tempus sapien euismod quis. Vestibulum suscipit ex ex, nec euismod leo eleifend eget. Interdum et malesuada fames ac ante ipsum primis in faucibus. Integer tincidunt sodales augue, ut consequat libero blandit non. Suspendisse id dolor vel lorem bibendum luctus sit amet a odio. Vestibulum varius viverra ipsum quis rhoncus. Praesent bibendum dictum ex. Quisque eu laoreet leo.</p>';
        }
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
        console.log('ppp', data);
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
