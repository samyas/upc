import { Component, OnInit, Input, Output, EventEmitter, OnChanges} from '@angular/core';

@Component({
  selector: 'app-pagination-custom',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnChanges {

  @Input() total: number;
  @Input() page: number;
  @Input() pageSize = 5;
  @Output() pageEvent = new EventEmitter<number>();

  expanded = false;

  pageSizeOptions = [10, 25, 50];
  public from = 1;
  public to = 1;
  public isNext = false;
  public isPrevious = false;
  public isNextNext = false;
  public isPreviousPrevious = false;

  constructor() { }

  ngOnChanges(changes: any) {
   // console.log(changes);
    if (changes.page && changes.page.currentValue) {
      this.page =  changes.page.currentValue;
    }
    if (changes.total && changes.total.currentValue) {
      this.total =  changes.total.currentValue;
    }
   this.refresh();
}


  refresh() {
    this.from = 1 + (this.page * this.pageSize);
    this.to = this.from + (this.pageSize - 1);
    this.isNext = this.to < this.total;
    this.isPrevious = !(this.from === 1);


    this.isNextNext = (this.to + this.pageSize) < this.total;
    this.isPreviousPrevious = !( (this.from - this.pageSize) <= 1);
  }



  next() {
    this.pageEvent.emit(this.page + 1);
  }
  previous() {
    this.pageEvent.emit(this.page - 1);
  }

  nextnext() {
    this.pageEvent.emit(this.page + 2);
  }
  previousprevious() {
    this.pageEvent.emit(this.page - 2);
  }

}
