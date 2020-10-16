
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
