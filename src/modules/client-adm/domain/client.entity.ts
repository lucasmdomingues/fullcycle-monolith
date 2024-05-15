import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import ID from "../../@shared/domain/value-object/id.value-object"

type ClientProps = {
    id?: ID;
    name: string;
    email: string;
    address: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export default class Client extends BaseEntity implements AggregateRoot {
    private name: string;
    private email: string;
    private address: string;

    constructor(props: ClientProps) {
        super(props.id, props.createdAt, props.updatedAt)
        this.name = props.name
        this.email = props.email
        this.address = props.address
    }

    get Name(): string {
        return this.name
    }

    get Email(): string {
        return this.email
    }

    get Address(): string {
        return this.address
    }
}