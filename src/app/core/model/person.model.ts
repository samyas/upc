import { ParseErrorLevel } from '@angular/compiler';
 import { ShortDepartment } from './organisation.model';


export class Person {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    photoFileId: string;
    phone: string;
    skype: string;
    department: ShortDepartment;
    valid: boolean;

    get name() {
      return  this.firstName + ' ' + this.lastName;
    }
}
