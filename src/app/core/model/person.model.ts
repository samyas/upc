import { FileDescriptor } from './file-descriptor.model';

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
    workload: number;
    identifier: string;
    description: string;
    currentProjects: number;
    previousProjects: number;
    shortDescription: string;
    skills: Array<string>;
    image: FileDescriptor;
}


export class UpdatePerson {
  id: string;
  shortDescription: string;
  description: string;
  skills: Array<string>;

}

export enum PersonFunction {
  MODEL_LEADER = 'MODEL_LEADER',
  ADMIN_CREATOR = 'ADMIN_CREATOR',
  STUDENT = 'STUDENT',
  STAFF = 'STAFF'
}


export enum Role {
  MODULE_LEADER = 'MODULE_LEADER',
  ADMIN_CREATOR = 'ADMIN_CREATOR',
  STUDENT = 'STUDENT',
  STAFF = 'STAFF',
  SUPER_ADMIN = 'SUPER_ADMIN'
}
