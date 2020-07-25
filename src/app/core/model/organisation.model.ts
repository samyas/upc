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
     order: number;
     mandatoryBeforeStart: boolean;
}


export enum ModuleType {
    DISSERTATION = 'Dissertation',
    GROUP_PROJECT = 'Group project',
    WORK_BASED_LEARNING = 'Work Based Learning'
}

export enum SubModuleType {
    HONOURS = 'Honours',
    MASTERS = 'Masters',
    PHD = 'PhD'
}

export const MODULES_TYPE: Array<ModuleType> = [ModuleType.DISSERTATION, ModuleType.GROUP_PROJECT, ModuleType.WORK_BASED_LEARNING];


export const SUB_MODULES_TYPE: Array<SubModuleType> = [SubModuleType.HONOURS, SubModuleType.MASTERS, SubModuleType.PHD];

export class Address {
        address: string;
        city: string;
        zipCode: string;
        country: string;
}


