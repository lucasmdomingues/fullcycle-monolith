import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Address from "../../@shared/domain/value-object/address.value-object";
import ID from "../../@shared/domain/value-object/id.value-object";
import InvoiceItem from "./invoice-item.entity";

type InvoiceProps = {
    id?: ID,
    name: string,
    document: string,
    address: Address,
    items: InvoiceItem[]
}

export default class Invoice extends BaseEntity implements AggregateRoot {
    private name: string;
    private document: string;
    private address: Address;
    private items: InvoiceItem[];

    constructor(props: InvoiceProps) {
        super(props.id)
        this.name = props.name
        this.document = props.document
        this.address = props.address
        this.items = props.items
    }

    get Name(): string {
        return this.name;
    }

    get Document(): string {
        return this.document;
    }

    get Address(): Address {
        return this.address;
    }

    get Items(): InvoiceItem[] {
        return this.items;
    }

    calculateTotal(): number {
        return this.items.reduce((acc, item) => acc + item.Price, 0)
    }
}