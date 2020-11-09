

import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../core/services/project.service';
import { ActivatedRoute, ParamMap, RouterOutlet } from '@angular/router';
import { Project, P_PROPOSAL, P_ASSIGNED, Member } from '../core/model/project.model';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { PersonService } from 'src/app/core/services/person.service';
import { Person, Role } from 'src/app/core/model/person.model';
import { routerAnimation } from '../core/config/route-animation';
import { User } from '../core/model/auth.model';



@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  animations: [routerAnimation()],
})
export class ProjectComponent implements OnInit {

  project: Project = new Project();
  error = null;

  constructor(private route: ActivatedRoute, private projectService: ProjectService) { }

  ngOnInit() {
    this.route.paramMap.pipe(
        switchMap((params: ParamMap) => of(params.get('id')))).subscribe((id) => {
        this.loadProject(id);
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
}
