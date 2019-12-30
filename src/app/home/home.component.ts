import { MenuItem } from './../shared/menu-item/menu-item.model';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

import { Observable } from 'rxjs';
import { Settings } from '../core/app.settings.model';
import { AppSettings } from '../core/app.settings';
import { AuthService } from '../core/services/auth.service';
import { User } from '../core/model/auth.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component2.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);
  public settings: Settings;
  menuItems: Array<MenuItem> = [];
  userInfo: User = new User();

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

  modelSupervisorItems: Array<MenuItem> = [
    {
      label: 'Dashboards',
      icon: 'dashboard',
      link: './dashboard/leader'
    },
  /*  {
      label: 'Persons',
      icon: 'supervisor_account',
      link: './students'
    },*/
    {
      label: 'Projects',
      icon: 'computer',
      link: './project'
    }
  ];

  modelManagerItems: Array<MenuItem> = [
    {
      label: 'Dashboards',
      icon: 'dashboard',
      link: './dashboard/leader'
    },
    {
      label: 'Persons',
      icon: 'supervisor_account',
      link: './persons'
    },
    {
      label: 'Users',
      icon: 'supervisor_account',
      link: './users'
    },
    {
      label: 'My Projects',
      icon: 'computer',
      link: './project'
    },
    {
      label: 'University',
      icon: 'computer',
      link: './organisation'
    }
  ];

  modelStudentsItems: Array<MenuItem> = [
    {
      label: 'Dashboards',
      icon: 'dashboard',
      link: './dashboard/leader'
    },
    {
      label: 'My Projects',
      icon: 'computer',
      link: './project'
    }
  ];

  constructor( private router: Router, private auhtService: AuthService,
    public appSettings: AppSettings, private breakpointObserver: BreakpointObserver) {
    this.settings = this.appSettings.settings;
  }


  ngOnInit() {
    this.menuItems = this.modelManagerItems;
    this.auhtService.userInfo().subscribe(
      data => { this.userInfo = data;
       // this.menuItems = this.modelManagerItems;
      }
      , error =>  {
        console.log(error);
      });
  }

  logout() {
    console.log('ttttt');
    this.auhtService.logout();
    console.log('ssssssss');
    this.router.navigate(['login']);
  }


  changeTheme(theme: string) {
    this.settings.theme = theme;
  }

}
