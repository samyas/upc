import { TaskComponent } from './task/task.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  public icons = [ 'home', 'person', 'alarm', 'work', 'mail', 'favorite'];
  public colors = [ 'accent', 'primary', 'warn' ];

  constructor( public dialog: MatDialog) { }

  ngOnInit() {
  }

  public openTaskDialog(task) {
    const dialogRef = this.dialog.open(TaskComponent, {
        data: task
    });
    dialogRef.afterClosed().subscribe(user => {
        if (user) {
         //   (user.id) ? this.updateUser(user) : this.addUser(user);
        }
    });
}

}
