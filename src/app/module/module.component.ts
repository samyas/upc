

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, RouterOutlet } from '@angular/router';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { PersonService } from 'src/app/core/services/person.service';
import { routerAnimation } from '../core/config/route-animation';
import { Module } from '../core/model/organisation.model';
import { OrganisationService } from '../core/services/organisation.service';
import { SharedDataService } from '../core/services/shared-data.service';



@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.scss'],
  animations: [routerAnimation()],
})
export class ModuleComponent implements OnInit {

  value = 50;
  module: Module = new Module();
  error = null;

  constructor(private route: ActivatedRoute, private organisationService: OrganisationService,
    private dataService: SharedDataService, private  personService: PersonService
    ) { }

  ngOnInit() {
    this.route.paramMap.pipe(
        switchMap((params: ParamMap) => of(params.get('id')))).subscribe((id) => {
        this.loadModule(id);
      });
  }

  public getRouteAnimation(outlet: RouterOutlet) {
    const res =
      outlet.activatedRouteData.num === undefined
        ? -1
        : outlet.activatedRouteData.num;
    return res;
  }


    loadModule(id: string) {
      this.dataService.currentOrganisationId.subscribe(organisationId =>
         this.organisationService.getModule(organisationId, id).subscribe(
         data => {this.module = data; },
         error => console.log(error))
         );
    }
}
