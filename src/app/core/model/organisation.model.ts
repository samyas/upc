import { ShortPerson } from './short-person.model';
import { FileDescriptor } from './file-descriptor.model';

export class Module {
    departmentId: string;
    name: string;
    code: string;
    description: string;
    longDescription: boolean;
    responsible: ShortPerson;
    type: ModuleType;
    subType: SubModuleType;
    actions: Array<Action>;
    supervisorTerms: Array<Term>;
    maxTeamNbr: number;
}


export class ShortDepartment {
    id: string;
    name: string;
}

export class Organisation {
    id: string;
    name: string;
    description: string;
    longDescription: boolean;
    email: string;
    address: Address;
    departments: Array<Module>;
    responsible: ShortPerson;
    creationDate: string;
    logo: FileDescriptor;
}


export class Action {
    actionId: string;
    name: string;
    description: string;
    startDate: Object;
    endDate: Object;
    weekNbr: number;
    dayNbr: number;
    order: number;
    beforeStart: boolean;
    attachmentList: Array<FileDescriptor>;
}


export class Term {
     termId: string;
     name: string;
     description: string;
     quota: number;
     workload: number;
     order: number;
     mandatoryBeforeStart: boolean;
}


export enum ModuleType {
    DISSERTATION = 'Dissertation',
    GROUP_PROJECT = 'Group Project',
    WORK_BASED_LEARNING = 'Work Based Learning',
    PHD = 'PhD'
}

export enum SubModuleType {
    HONOURS = 'Undergraduate',
    MASTERS = 'Postgraduate'
}

export const MODULES_TYPE: Array<ModuleType> = [ModuleType.DISSERTATION, ModuleType.GROUP_PROJECT,
     ModuleType.WORK_BASED_LEARNING,  ModuleType.PHD];


export const SUB_MODULES_TYPE: Array<SubModuleType> = [SubModuleType.HONOURS, SubModuleType.MASTERS];

export class Address {
        address: string;
        city: string;
        zipCode: string;
        country: string;
}


