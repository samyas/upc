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

  menuItems: Array<MenuItem> = [
    {
      label: 'Dashboard',
      icon: 'dashboard',
      link: './dashboard'
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


  constructor(public appSettings: AppSettings, private breakpointObserver: BreakpointObserver) {
    this.settings = this.appSettings.settings;
  }


  ngOnInit() {
  }

  changeTheme(theme: string) {
    this.settings.theme = theme;
  }

}
