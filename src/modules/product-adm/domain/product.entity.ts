import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import ID from "../../@shared/domain/value-object/id.value-object";

type ProductProps = {
    id?: ID;
    name: string;
    description: string;
    purchasePrice: number;
    stock: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export default class Product extends BaseEntity implements AggregateRoot {
    private name: string;
    private description: string;
    private purchasePrice: number;
    private stock: number;

    constructor(props: ProductProps) {
        super(props.id)
        this.name = props.name;
        this.description = props.description;
        this.purchasePrice = props.purchasePrice;
        this.stock = props.stock;
    }

    get Name(): string {
        return this.name
    }

    set Name(name: string) {
        this.name = name
    }

    get Description(): string {
        return this.description
    }

    set Description(description: string) {
        this.description = description
    }

    get PurchasePrice(): number {
        return this.purchasePrice
    }

    set PurchasePrice(purchasePrice: number) {
        this.purchasePrice = purchasePrice
    }

    get Stock(): number {
        return this.stock
    }

    set Stock(stock: number) {
        this.stock = stock
    }
}