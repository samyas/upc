export class FileDescriptor {
    fileName: string;
    url: string;
    type: string;
    contentType: string;
    key: string;
}


export class ModuleFile extends FileDescriptor {
    id: string;
    identifier: string;
    moduleId: string;
}
