import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import ID from "../../@shared/domain/value-object/id.value-object";

type ClientProps = {
    id?: ID;
    name: string;
    email: string;
    document: string
    street: string
    number: string
    complement: string
    city: string
    state: string
    zipCode: string
}

export default class Client extends BaseEntity implements AggregateRoot {
    private name: string;
    private email: string;
    private document: string;
    private street: string;
    private number: string;
    private complement: string;
    private city: string;
    private state: string;
    private zipCode: string;

    constructor(props: ClientProps) {
        super(props.id)
        this.name = props.name;
        this.email = props.email;
        this.document = props.document
        this.street = props.street
        this.number = props.number
        this.complement = props.complement
        this.city = props.city
        this.state = props.state
        this.zipCode = props.zipCode
    }

    get Name(): string {
        return this.name;
    }
    get Email(): string {
        return this.email;
    }

    get Document(): string {
        return this.document
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
        return this.city
    }

    get State(): string {
        return this.state
    }

    get ZipCode(): string {
        return this.zipCode
    }
}
