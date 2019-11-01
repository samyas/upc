import { ShortPerson } from './short-person.model';
import { Task } from './task.model';
export class ProjectOverview {
    projectId: string;
    name: string;
    description: string;
    startDate: Object;
    endDate: Object;
    supervisor: ShortPerson;
    examinator: ShortPerson;
    creator: ShortPerson;
    students: Array<ShortPerson>;
    status: string;
    nbrMileStones: number;
    nbrTasks: number;
    category: string;
    nbrCheckPoint:  number;
    progress: number;
    imageId: string;

}

export class Goal {
    goalId: string;
    name: string;
    description: string;
    startDate: Object;
    endDate: Object;
    tasks: Array<Task>;
}

export class Apply {
    personId: string;
    description: string;
}


export class Project extends ProjectOverview {
    longDescription: string;
    goals: Array<Goal>;
}
