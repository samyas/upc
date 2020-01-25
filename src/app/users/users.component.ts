import { User } from './../core/model/auth.model';
import { AuthService } from './../core/services/auth.service';
import {Component, OnInit, ViewChild} from '@angular/core';
import { FormControl } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private  authService: AuthService) { }

   list = true;
  users: Array<User> = [];

  length = 100;
  pageIndex = 0;
  pageSize = 10;
  tabs = ['Incoming Requests', 'ALL', 'Organisation Creation Requests'];
  isCreator = false;
  activeTab = this.tabs[0];
  pageSizeOptions = [10, 25, 50];

  onPageChange(e) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.loadData(this.pageIndex, this.pageSize);
  }

  setActive(nextTab) {
    this.activeTab = nextTab;
    this.loadData(this.pageIndex, this.pageSize);
  }

  ngOnInit() {
    this.loadData(0, this.pageSize);
  }

  loadData(page: number, pageSize: number) {
    let filter = '';
    if (this.activeTab === this.tabs[2]) {
        filter = '&creator=true';
    }
    this.authService.getPagedUsers(filter, null, page, pageSize).subscribe(
      data => {
        this.users =  data.content;
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

