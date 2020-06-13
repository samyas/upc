import { ShortPerson } from './short-person.model';
import { FileDescriptor } from './file-descriptor.model';
import { StatusProperties, StatusFlow } from './project.model';
import { Role } from './person.model';

export class Task {
    taskId: string;
    name: string;
    description: string;
    startDate: Object;
    endDate: Object;
    workshop: string;
    status: string;
    assignedTo:  Array<ShortPerson>;
   createdBy: ShortPerson;
   attachmentList: Array<FileDescriptor>;
   messages: Array<Message>;
}


export class Message {
    messageId: string;
    content: string;
    start: Object;
    modifiedTime: Object;
    writer: ShortPerson;
}




/***********************TASK STATUS*********************************/
  export const T_NEW = new StatusProperties('NEW', 'New', 'New', [Role.STAFF]);
  export const T_START = new StatusProperties('START', 'Progress', 'Start', [Role.STAFF]);
  export const T_REVIEW = new StatusProperties('REVIEW', 'Review', 'Submit', [Role.STAFF]);
  export const T_COMPLETED = new StatusProperties('COMPLETED', 'Completed', 'Completed', [Role.STAFF]);

 export const T_STATUS_FLOWS: Array<StatusFlow> = [
        new StatusFlow(T_NEW, [T_START]),
        new StatusFlow(T_START, [T_REVIEW]),
        new StatusFlow(T_REVIEW, [ T_COMPLETED, T_NEW, T_START]),
        new StatusFlow(T_COMPLETED, [ T_REVIEW, T_NEW, T_START])
       ] ;

 export const T_ALL_STATUS: Array<StatusProperties> = [T_NEW, T_START, T_REVIEW, T_COMPLETED];
