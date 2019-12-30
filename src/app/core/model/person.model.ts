import { ParseErrorLevel } from '@angular/compiler';
// import { ShortDepartment } from './organisation.model';


export class ShortDepartment {
    id: string;
    name: string;
}

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
}
