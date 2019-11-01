import { Person } from './../../core/model/person.model';
import { Component, OnInit, Input , Output, EventEmitter,  ViewChild, ElementRef} from '@angular/core';
import { trigger, style, transition, animate, state, group } from '@angular/animations';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material';


@Component({
  selector: 'app-select-box',
  templateUrl: './select-box.component.html',
  styleUrls: ['./select-box.component.scss'],
})
export class SelectBoxComponent implements OnInit {

  @Input()   options: Person[] = [];
  @Output() public selected = new EventEmitter();

  @ViewChild('item') nameField: ElementRef;


  myControl = new FormControl();
  filteredOptions: Observable<Person[]>;

  constructor() { }

  ngOnInit() {
    console.log('init select box');
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: any): Person[] {
    console.log('vaal', value);
    let filterValue = '';
    if (value && value.firstName) {
      filterValue = value.firstName.toLowerCase();
    } else if (value) {
      filterValue = value.toLowerCase();
    }
    return this.options.filter(option => option.firstName.toLowerCase().indexOf(filterValue) === 0);
  }

  public onSelection(event: MatAutocompleteSelectedEvent) {
    console.log(event.option.value);
    this.selected.emit(event.option.value);
  }

  displayFn(person: Person) {
    if (person) { return person.firstName; }
  }

}
