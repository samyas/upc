
import { PersonService } from '../core/services/person.service';
import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./persons.component.scss']
})
export class PersonComponent implements OnInit {


  constructor(private  personService: PersonService) { }

  ngOnInit() {
  }

}
