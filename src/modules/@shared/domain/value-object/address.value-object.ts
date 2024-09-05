import ValueObject from "./value-object.interface";

type AddressProps = {
    street: string,
    number: string,
    complement: string,
    city: string,
    state: string,
    zipCode: string
}

export default class Address implements ValueObject {
    private street: string;
    private number: string;
    private complement: string;
    private city: string;
    private state: string;
    private zipCode: string;

    constructor(props: AddressProps) {
        this.street = props.street
        this.number = props.number
        this.complement = props.complement
        this.city = props.city
        this.state = props.state
        this.zipCode = props.zipCode
    }

    get Street(): string {
        return this.street
    }

    get Number(): string {
        return this.number
    }

    get Complement(): string {
        return this.complement
    }

    get City(): string {
        return this.City
    }

    get State(): string {
        return this.state
    }

    get ZipCode(): string {
        return this.zipCode
    }
}