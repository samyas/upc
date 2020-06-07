

import { ProjectService } from './../../core/services/project.service';
import { Term } from './../../core/model/organisation.model';
import { PersonService } from '../../core/services/person.service';
import {Component, OnInit, ViewChild, Input} from '@angular/core';


import { Person } from '../../core/model/person.model';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AssignMember } from 'src/app/core/model/assign.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { filter, switchMap, map, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-assign-persons',
  templateUrl: './assign-persons.component.html',
  styleUrls: ['./assign-persons.component.scss']
})
export class AssignPersonsComponent implements OnInit {



  constructor( public activeModal: NgbActiveModal, public fb: FormBuilder, private  personService: PersonService,
    private projectService: ProjectService) { }

   @Input()  projectId: string;
   @Input()  term: Term;
   @Input()  student: boolean;
   @Input() persons: Array<Person>  = [];

  submitted = false;
  serverError = '';
  public form: FormGroup;

  total = 5;
  page = 0;
  pageSize = 5;
  pageSizeOptions = [10, 25, 50];

  quickFilter = null;

  onPageChange(e) {
    this.page = e;
    this.loadData(null);
  }

  ngOnInit() {
    this.form = this.fb.group({ name: null});
    this.loadData(null);
    this.onChanges();
  }

  onChanges(): void {
    this.form.get('name').valueChanges.pipe(debounceTime(500))
    .subscribe( data => { this.loadData(data); });
  }

  loadData(name: string) {
    this.personService.getFiltredPagedPersons(name, this.student, null, this.page, this.pageSize).subscribe(
      data => {
        this.persons =  data.content;
        this.total = data.totalElements;
        this.serverError  = null;
      }
      , error =>  {
        console.log(error);
        this.serverError = error.message;
      }
    );
  }

  assingPerson (personId) {
    const assignPerson: AssignMember = new AssignMember();
    assignPerson.termId = this.term.termId;
    assignPerson.personId = personId;
      this.projectService.assignMember(this.projectId, assignPerson).subscribe(
       data => {
         console.log('assign supervisor', data);
         this.activeModal.close();
       }
       , error =>  {
         console.log('failed to assign supervisor', error);
         this.serverError = error.message;
       }
     );

  }

}

