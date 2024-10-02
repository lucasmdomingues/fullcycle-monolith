import BaseEntity from "../../@shared/domain/entity/base.entity"
import ID from "../../@shared/domain/value-object/id.value-object"
import Client from "./client.entity"
import Product from "./product.entity"

type OrderProps = {
    id?: ID,
    client: Client,
    produts: Product[],
    status?: string
}

export default class Order extends BaseEntity {
    private client: Client;
    private products: Product[]
    private status: string

    constructor(props: OrderProps) {
        super(props.id)
        this.client = props.client
        this.products = props.produts
        this.status = props.status || "pending"
    }

    approved(): void {
        this.status = "approved"
    }

    get Client(): Client {
        return this.client
    }
    get Products(): Product[] {
        return this.products
    }
    get Status(): string {
        return this.status
    }
    get Total(): number {
        return this.products.reduce((total, product) => total + product.SalesPrice, 0)
    }
}
