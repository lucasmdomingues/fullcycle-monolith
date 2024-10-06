import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import ID from "../../@shared/domain/value-object/id.value-object"

type ProductProps = {
    id?: ID;
    name: string;
    description: string;
    purchasePrice: number;
}

export default class Product extends BaseEntity implements AggregateRoot {
    private name: string;
    private description: string;
    private purchasePrice: number;

    constructor(props: ProductProps) {
        super(props.id);
        this.name = props.name;
        this.description = props.description;
        this.purchasePrice = props.purchasePrice;
    }

    get Name(): string {
        return this.name
    }
    get Description(): string {
        return this.description
    }
    get PurchasePrice(): number {
        return this.purchasePrice
    }
}
