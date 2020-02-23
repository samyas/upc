
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
    personfunction: PersonFunction;
}



export enum PersonFunction {
  MODEL_LEADER = 'MODEL_LEADER',
  ADMIN_CREATOR = 'ADMIN_CREATOR',
  STUDENT = 'STUDENT',
  STAFF = 'STAFF'
}
