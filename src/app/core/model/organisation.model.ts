import { ShortPerson } from './short-person.model';

export class Department {
    id: string;
    name: string;
    code: string;
    description: string;
    longDescription: boolean;
    responsible: ShortPerson;
    type: ModuleType;
    subType: SubModuleType;
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
    departments: Array<Department>;

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


