import { User } from './../core/model/auth.model';
import { AuthService } from './../core/services/auth.service';
import {Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material';

import {MatPaginator, MatTableDataSource, PageEvent} from '@angular/material';
import { FormControl } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private  authService: AuthService,  public dialog: MatDialog) { }

   list = true;

  displayedColumns = [ 'firstName', 'lastName', 'email', 'enabled', 'isCreator', 'action'];
  dataSource: MatTableDataSource<User>  = new MatTableDataSource<User>();

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
    this.authService.getPagedUsers(null, null, page, pageSize).subscribe(
      data => {
        this.dataSource =  new MatTableDataSource<User>(data.content);
        this.length = data.totalElements;
      }
      , error => alert(error)
    );
  }

  activate(userId: string) {
    this.authService.activate(userId).subscribe(
      data => {
        this.loadData(this.pageIndex, this.pageSize);
      }
      , error => alert(error)
    );
  }

}

