import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-assign',
  templateUrl: './assign.component.html'
})
export class AssignComponent implements OnInit {

  showAssign: Boolean = true;

  show: Boolean =  false;

  constructor() { }

  ngOnInit() {

  }

}
