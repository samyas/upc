import { PersonService } from 'src/app/core/services/person.service';
import { SharedDataService } from './../core/services/shared-data.service';
import { MenuItem } from './../shared/menu-item/menu-item.model';
import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { Settings } from '../core/app.settings.model';
import { AppSettings } from '../core/app.settings';
import { AuthService } from '../core/services/auth.service';
import { User } from '../core/model/auth.model';
import { Router } from '@angular/router';
import { Organisation } from '../core/model/organisation.model';
import { OrganisationService } from '../core/services/organisation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public settings: Settings;
  menuItems: Array<MenuItem> = [];
  userInfo: User = null;
  serverError = null;
  organisation: Organisation = new Organisation();

  items: Array<MenuItem> = [
    {
      label: 'Dashboard',
      icon: 'dashboard',
      link: './dashboard/supervisor'
    },
    {
      label: 'Students',
      icon: 'supervisor_account',
      link: './students'
    },
    {
      label: 'Projects',
      icon: 'computer',
      link: './project'
    },
    {
      label: 'Tests',
      icon: 'offline_pin',
      link: './projects',
      items: [
        {
          label: 'Test 1.0',
          icon: 'favorite',
          link: './dashboard'
        },
        {
          label: 'Test 2.0',
          icon: 'favorite',
          link: './students'
        }
      ]
    }
  ];


  constructor( private router: Router, private auhtService: AuthService,
    public organisationService: OrganisationService,
    public appSettings: AppSettings, private dataService: SharedDataService) {
    this.settings = this.appSettings.settings;
  }


  ngOnInit() {
 //   this.menuItems = this.modelManagerItems;
    this.auhtService.userInfo().subscribe(
      data => { this.userInfo = data;
        this.dataService.saveUser(this.userInfo);
      }
      , error =>  {
        console.log(error);
      });
      this.loadOrganisation();
  }

  logout() {
    this.auhtService.logout();
    this.router.navigate(['login']);
  }

  loadOrganisation() {
    this.organisationService.getOrganisationDetail().subscribe(
      data => {
         this.organisation = data;
         this.dataService.saveOrganisationId(this.organisation.id);
      }
      , error =>  {
        console.log(error);
      }
    );
  }


  changeTheme(theme: string) {
    this.settings.theme = theme;
  }

}
