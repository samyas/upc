import { AuthService } from '../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrganisationService } from '../core/services/organisation.service';

@Component({
  selector: 'app-init-organisation',
  templateUrl: './init-organisation.component.html',
  styleUrls: ['./init-organisation.component.scss']
})
export class InitOrganisationComponent implements OnInit {

  public form: FormGroup;
  submitted = false;
  serverError = null;

  constructor(private organisationService: OrganisationService, private router: Router,
    public fb: FormBuilder , private authService: AuthService) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      contactEmail: ['',  [Validators.required, Validators.email]],
      description: ['', Validators.required],
      longDescription: null,
      address: this.fb.group({
        street: [null, Validators.required],
        zipCode: [null, Validators.required],
        city: [null, Validators.required],
        country: [null, Validators.required],
      })
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
      this.router.navigate(['home/']);
    }, error =>  {
      console.log(error);
      this.serverError = error.message;
    });
 }
}
