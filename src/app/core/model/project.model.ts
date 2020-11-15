import { FileDescriptor } from './file-descriptor.model';
import { ShortDepartment } from './organisation.model';
import { ShortPerson } from './short-person.model';
import { Task } from './task.model';
import { Role } from './person.model';
export class ProjectOverview {
    projectId: string;
    name: string;
    shortDescription: string;
    description: string;
    startDate: Date;
    endDate: Date;
    creator: ShortPerson;
    team: Array<Member>;
    members: Array<Member>;
    attachments: Array<FileDescriptor>;
    status: string;
    statusCode: string;
    nbrMileStones: number;
    nbrTasks: number;
    category: string;
    nbrCheckPoint:  number;
    progress: number;
    type: string;
    keywords: Array<string>;
    department: ShortDepartment;
    imageId: string;
    extended: boolean;
    nextAction: Goal;
    logo: FileDescriptor;
    applies: Array<Apply>;
    canDelete: boolean;
    canEdit: boolean;
    maxTeamMembers: number;
    diff: DiffDays;
    totalMembers: number;
    position: string;
}

export class EditProject {
    projectId: string;
    name: string;
    shortDescription: string;
    description: string;
    startDate: Date;
    endDate: Date;
    category: string;
    type: string;
    keywords: Array<string>;
    departmentId: string;
    logo: FileDescriptor;
}


export class Goal {
    goalId: string;
    name: string;
    description: string;
    startDate: Object;
    endDate: Object;
    tasks: Array<Task>;
    status: string;
    createdBy: ShortPerson;
    actualStartDate: Object;
    actualEndDate: Object;
    actionId: string;
    isAction: boolean;
    attachmentsArrayList: Array<FileDescriptor>;
    nextActions: Array<StatusProperties>;
    beforeStart: boolean;
}

export class Apply {
    description: string;
    createdBy: ShortPerson;
    files: Array<FileDescriptor>;
    submitDate: Object;
    termId: string;
}

export class Member {
    personId: string;
    firstName: string;
    lastName: string;
    imageId: string;
    termId: string;
    termName: string;
    signed: boolean;
}

export class DiffDays {
    months: number;
    days: number;
    constructor(months1, days1) {
        this.months = months1;
        this.days = days1;
    }
}


export class Project extends ProjectOverview {
    longDescription: string;
    goals: Array<Goal>;
}


export class StatusFlow {
    current: StatusProperties;
    next: Array<StatusProperties>;
    constructor(current: StatusProperties, next: Array<StatusProperties>) {
        this.current = current;
        this.next = next;
  }
}




  export class StatusProperties {
       code: string;
       label: string;
       action: string;
       roles: Array<Role>;
       value: string;
       constructor(code: string, label: string, action: string, roles: Array<Role>) {
                            this.code = code;
                            this.label = label;
                            this.action = action;
                            this.roles = roles;
                            this.value = code;
       }
  }

/***********************PROJECT STATUS*********************************/

  export const P_PROPOSAL = new StatusProperties('PROPOSAL', 'Proposal', 'Proposal', [Role.STAFF]);
  export const P_ASSIGNED = new StatusProperties('ASSIGNED', 'Assigned', 'Assign', [Role.STAFF, Role.MODULE_LEADER]);
  export const P_REGISTRATION = new StatusProperties('REGISTRATION', 'Registration', 'Regsiter', [Role.STAFF, Role.MODULE_LEADER]);
  export const P_START = new StatusProperties('START', 'Start', 'Start', [Role.MODULE_LEADER]);
  export const P_PROGRESS = new StatusProperties('PROGRESS', 'Progress', 'Progress', [Role.STAFF, Role.MODULE_LEADER]);
  export const P_SUSPEND = new StatusProperties('SUSPEND', 'Suspend', 'Suspend', [Role.MODULE_LEADER]);
  export const P_REALLOCATED = new StatusProperties('REALLOCATED', 'Re-Allocated', 'Re Allocate', [Role.MODULE_LEADER]);
  export const P_WITHDRAW = new StatusProperties('WITHDRAW', 'Withdraw', 'Withdraw', [Role.MODULE_LEADER]);
  export const P_COMPLETED = new StatusProperties('COMPLETED', 'Completed', 'Completed', [Role.MODULE_LEADER]);

  export const PROJECT_STATUS_FLOWS: Array<StatusFlow> = [
    new StatusFlow(P_PROPOSAL, [P_ASSIGNED]),
    new StatusFlow(P_ASSIGNED, [P_REGISTRATION]),
    new StatusFlow(P_REGISTRATION, [P_START]),
    new StatusFlow(P_START, [P_PROGRESS]),
    new StatusFlow(P_PROGRESS, [ P_COMPLETED, P_SUSPEND, P_WITHDRAW, P_REALLOCATED]),
    new StatusFlow(P_SUSPEND, [ P_PROGRESS]),
    new StatusFlow(P_REALLOCATED, [ P_PROGRESS])
   ] ;


   export const P_ALL_STATUS: Array<StatusProperties> = [P_PROPOSAL, P_ASSIGNED, P_REGISTRATION, P_START, P_PROGRESS,
    P_SUSPEND, P_REALLOCATED, P_WITHDRAW, P_COMPLETED];

/***********************GOAL STATUS*********************************/
  export const G_NEW = new StatusProperties('NEW', 'New', 'New', [Role.STAFF]);
  export const G_START = new StatusProperties('START', 'Started', 'Start', [ Role.STUDENT]);
  export const G_REVIEW = new StatusProperties('REVIEW', 'Review', 'Submit', [Role.STUDENT]);
  export const G_DECLINED = new StatusProperties('DECLINED', 'Declined', 'Decline', [Role.STAFF, Role.MODULE_LEADER]);
  export const G_COMPLETED = new StatusProperties('COMPLETED', 'Completed', 'Completed', [Role.STAFF, Role.MODULE_LEADER]);

 export const GOAL_STATUS_FLOWS: Array<StatusFlow> = [
        new StatusFlow(G_NEW, [G_START]),
        new StatusFlow(G_START, [G_REVIEW]),
        new StatusFlow(G_REVIEW, [ G_COMPLETED, G_DECLINED]),
        new StatusFlow(G_DECLINED, [G_REVIEW])
       ] ;
