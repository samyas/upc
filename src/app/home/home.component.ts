import { MenuItem } from './../shared/menu-item/menu-item.model';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component2.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);

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
      link: './projects'
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


  constructor(private breakpointObserver: BreakpointObserver) {}


  ngOnInit() {
  }

}
