import { Assign } from './../core/model/assign.model';
import { PersonService } from './../core/services/person.service';
import { ProjectService } from './../core/services/project.service';
import { ShortPerson } from './../core/model/short-person.model';
import { ProjectOverview, Apply } from './../core/model/project.model';
import {Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material';

import {MatPaginator, MatTableDataSource, PageEvent} from '@angular/material';
import { FormControl } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Person } from '../core/model/person.model';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.scss']
})
export class PersonsComponent implements OnInit {

  public icons = [ 'home', 'person', 'alarm', 'work', 'mail', 'favorite',  'work', 'mail', 'favorite'];

  constructor(private  personService: PersonService,  public dialog: MatDialog) { }

   list = true;

  displayedColumns = [ 'firstName', 'lastName', 'email', 'status', 'department', 'valid'];
  dataSource: MatTableDataSource<Person>  = new MatTableDataSource<Person>();

  pageEvent: PageEvent;

  length = 100;
  pageIndex = 0;
  pageSize = 10;
  pageSizeOptions = [10, 25, 50];


  @ViewChild(MatPaginator) paginator: MatPaginator;

  onPageChange(e) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.loadData(this.pageIndex, this.pageSize);

  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.loadData(0, this.pageSize);
  }

  loadData(page: number, pageSize: number) {
    this.personService.getPagedPersons(null, null, page, pageSize).subscribe(
      data => {
        this.dataSource =  new MatTableDataSource<Person>(data.content);
        this.length = data.totalElements;
      }
      , error => alert(error)
    );
  }


}

