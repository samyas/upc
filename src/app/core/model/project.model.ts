import { FileDescriptor } from './file-descriptor.model';
import { Department, ShortDepartment } from './organisation.model';
import { ShortPerson } from './short-person.model';
import { Task } from './task.model';
export class ProjectOverview {
    projectId: string;
    name: string;
    shortDescription: string;
    description: string;
    startDate: Date;
    endDate: Date;
    supervisors: Array<ShortPerson>;
    examinators: Array<ShortPerson>;
    creator: ShortPerson;
    teams: Array<ShortPerson>;
    attachments: Array<FileDescriptor>;
    status: string;
    nbrMileStones: number;
    nbrTasks: number;
    category: string;
    nbrCheckPoint:  number;
    progress: number;
    type: string;
    keywords: string;
    department: ShortDepartment;
    imageId: string;
    extended: boolean;

}

export class Goal {
    goalId: string;
    name: string;
    description: string;
    startDate: Object;
    endDate: Object;
    tasks: Array<Task>;
    attachmentsArrayList: Array<FileDescriptor>;
}

export class Apply {
    personId: string;
    description: string;
}


export class Project extends ProjectOverview {
    longDescription: string;
    goals: Array<Goal>;
}
