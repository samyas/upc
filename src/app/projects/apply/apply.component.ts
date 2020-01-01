import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Apply } from '../../core/model/project.model';
@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html'
 // styleUrls: ['./apply.component.scss']
})
export class ApplyComponent implements OnInit {

  public form: FormGroup;

  constructor(public apply: Apply, public fb: FormBuilder) {
        this.form = this.fb.group({
          description: [null, Validators.compose([Validators.required, Validators.minLength(6)])]
      });
   }

    ngOnInit() {
        this.apply = new Apply();
    }

    close(): void {
      //this.dialogRef.close();
    }

}
