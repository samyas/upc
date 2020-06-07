

import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../core/services/project.service';
import { ActivatedRoute, ParamMap, RouterOutlet } from '@angular/router';
import { Project } from '../core/model/project.model';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { PersonService } from 'src/app/core/services/person.service';
import { Person } from 'src/app/core/model/person.model';
import { routerAnimation } from '../core/config/route-animation';



@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  animations: [routerAnimation()],
})
export class ProjectComponent implements OnInit {

  value = 50;
  persons: Array<Person> = [];
  project: Project = new Project();
  error = null;

  constructor(private route: ActivatedRoute, private projectService: ProjectService,
    private  personService: PersonService
    ) { }

  ngOnInit() {
    this.route.paramMap.pipe(
        switchMap((params: ParamMap) => of(params.get('id')))).subscribe((id) => {
        this.loadProject(id);
        this.loadPersonData();
      });
  }

  public getRouteAnimation(outlet: RouterOutlet) {
    const res =
      outlet.activatedRouteData.num === undefined
        ? -1
        : outlet.activatedRouteData.num;
    return res;
  }


    loadProject(id: string) {
         this.projectService.getProjectDetail(id).subscribe(
         data => {this.project = data; },
         error => console.log(error));
    }

    loadPersonData() {
      this.personService.getPersons().subscribe(
        data => {
          this.persons =  data;
        }
        ,  error => this.error = error.message
      );
    }
}
