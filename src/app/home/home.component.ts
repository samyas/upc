import { MenuItem } from './../shared/menu-item/menu-item.model';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

import { Observable } from 'rxjs';
import { Settings } from '../core/app.settings.model';
import { AppSettings } from '../core/app.settings';

@Component({
  selector: 'app-home',
  templateUrl: './home.component2.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);
  public settings: Settings;
  menuItems: Array<MenuItem> = [];
 userInfo: { type: null, name: null};

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
   /* {
      label: 'Persons',
      icon: 'supervisor_account',
      link: './students'
    },*/
    {
      label: 'My Projects',
      icon: 'computer',
      link: './project'
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

  constructor(public appSettings: AppSettings, private breakpointObserver: BreakpointObserver) {
    this.settings = this.appSettings.settings;
  }


  ngOnInit() {
    this.userInfo = JSON.parse(localStorage.getItem('user'));
    console.log('get key', this.userInfo);
    if (this.userInfo == null) {
      this.menuItems = this.modelStudentsItems;
    } else {
      if (this.userInfo.type === 'MANAGER') {
        this.menuItems = this.modelManagerItems;
      } else if (this.userInfo.type === 'SUPERVISOR') {
        this.menuItems = this.modelSupervisorItems;
      } else if (this.userInfo.type === 'PERSON') {
        this.menuItems = this.modelStudentsItems;
      }
    }
  }


  changeTheme(theme: string) {
    this.settings.theme = theme;
  }

}
