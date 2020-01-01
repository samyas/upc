import { OrganisationService } from './../core/services/organisation.service';

import {Component, OnInit, ViewChild} from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-organisation',
  templateUrl: './organisation.component.html',
  styleUrls: ['./organisation.component.scss']
})
export class OrganisationComponent implements OnInit {

  public form: FormGroup;
  submitted = false;

  constructor(private organisationService: OrganisationService,  public fb: FormBuilder) { }
  ngOnInit() {
    this.form = this.fb.group({
        name: ['', Validators.required],
        contactEmail: ['', Validators.required],
        description: ['', Validators.required],
        longDescription: null,
        address: this.fb.group({
          street: [null, Validators.required],
          zipCode: [null, Validators.required],
          city: [null, Validators.required],
          country: [null, Validators.required],
        })
    }, {
    //  validator: MustMatch('password', 'confirmPassword')
  });
}

 // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

 onSubmit() {
     this.submitted = true;
     // stop here if form is invalid
     console.log('val', this.form.value);
     if (this.form.invalid) {
         return;
     }

     console.log(this.form.value);
     // const register: Register = this.form.value;
     this.organisationService.addOrganisation(this.form.value).subscribe( id => {
      console.log('success', id);
    }, error => console.log('error', error));
 }
}
