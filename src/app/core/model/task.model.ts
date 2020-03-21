import { ShortPerson } from './short-person.model';
import { FileDescriptor } from './file-descriptor.model';

export class Task {
    taskId: string;
    name: string;
    description: string;
    startDate: Object;
    endDate: Object;
    workshop: string;
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
