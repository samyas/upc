import { FileDescriptor } from './file-descriptor.model';
import { ShortDepartment } from './organisation.model';
import { Role } from './person.model';

export class Register {
    id: string;
    username: string;
    password: string;
    email: string;
    isCreator: boolean;
    message: string;
}



export class ShortOrganisation {
    tenantId: number;
    name: string;
}

export class User {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    organisationCreationRequest: boolean;
    message: string;
    tenantIds: Array<number>;
    defaultTenantId: number;
    enabled: boolean;
    roles: Array<Role>;
    personId: string;
    department: ShortDepartment;
    image: FileDescriptor;

    hasNoTenants(): boolean {
       return this.tenantIds && this.tenantIds.length === 0;
    }
}

export class AuthUser {
    username: string;
    token: string;
    needToActivate: boolean;
    needToInitOrg: boolean;
    enabled: boolean;
}
