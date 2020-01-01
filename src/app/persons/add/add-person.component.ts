import { PersonService } from './../../core/services/person.service';
import { startWith } from 'rxjs/operators';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Person } from 'src/app/core/model/person.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.scss']
})
export class AddPersonComponent implements OnInit {

  public form: FormGroup;
  public person: Person;
  submitted = false;
  serverError = '';

  constructor(
    public fb: FormBuilder, public personService: PersonService, private router: Router) {
        this.form = this.fb.group({
          id: null,
          firstName: [null, Validators.compose([Validators.required, Validators.minLength(2)])],
          lastName: [null, Validators.compose([Validators.required, Validators.minLength(2)])],
          email: ['', [Validators.required, Validators.email]],
          phone: null,
          departmentId: null
      });
    }

    ngOnInit() {

    }

  onSubmit() {
      this.submitted = true;
      // stop here if form is invalid
      console.log('val', this.form.value);
      if (this.form.invalid) {
          return;
      }

      this.person = this.form.value;
      console.log('person', this.person);
      this.personService.addPerson(this.form.value).subscribe( id => {
        this.router.navigate(['home/persons/' + id]);
      }, error => console.log('error', error));
    }

}
