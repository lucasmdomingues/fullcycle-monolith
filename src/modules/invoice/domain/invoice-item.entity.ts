import BaseEntity from "../../@shared/domain/entity/base.entity";
import ID from "../../@shared/domain/value-object/id.value-object";

type InvoiceItemProps = {
    id?: ID,
    name: string,
    price: number
}

export default class InvoiceItem extends BaseEntity {
    private name: string;
    private price: number;

    constructor(props: InvoiceItemProps) {
        super(props.id)
        this.name = props.name
        this.price = props.price
    }

    get Name(): string {
        return this.name;
    }

    get Price(): number {
        return this.price
    }
}