
export class Department {
    id: string;
    name: string;
    description: string;
    longDescription: boolean;
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

export class Address {
        address: string;
        city: string;
        zipCode: string;
        country: string;
}


