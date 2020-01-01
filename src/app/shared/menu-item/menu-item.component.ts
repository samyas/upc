/*import { Component, OnInit, Input } from '@angular/core';
import { trigger, style, transition, animate, state, group } from '@angular/animations';
import { MenuItem } from './menu-item.model';


@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({ height: '*', opacity: 0 })),
      transition(':leave', [
        style({ height: '*', opacity: 0.2 }),
        group([
          animate(200, style({ height: 0 })),
          animate('200ms ease-out', style({ opacity: 0 }))
        ])
      ]),
      transition(':enter', [
        style({ height: '0', opacity: 0 }),
        group([
          animate(200, style({ height: '*' })),
          animate('400ms ease-out', style({ opacity: 1 }))
        ])
      ])
    ]),
    trigger('isExpanded', [
      state('no', style({ transform: 'rotate(-90deg)' })),
      state('yes', style({ transform: 'rotate(0deg)', })),

      transition('no => yes',
        animate(200)
      ),
      transition('yes => no',
        animate(200)
      )
    ])
  ]
})
export class MenuItemComponent implements OnInit {

  @Input() menuItem: MenuItem;
  expanded = false;

  constructor() { }

  ngOnInit() {
  }

  hasItems(): boolean {
     return this.menuItem.items != null ? this.menuItem.items.length > 0 : false;
  }

}
*/
