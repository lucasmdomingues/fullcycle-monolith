import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import ID from "../../@shared/domain/value-object/id.value-object"

type TransactionProps = {
    id?: ID;
    amount: number;
    orderID: string;
    status?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export const PaymentStatusApproved = "approved"
export const PaymentStatusDeclined = "declined"

export default class Transaction extends BaseEntity implements AggregateRoot {
    private amount: number;
    private orderID: string;
    private status: string;

    constructor(props: TransactionProps) {
        super(props.id)
        this.amount = props.amount;
        this.orderID = props.orderID;
        this.status = props.status || "pending";
    }

    validate(): void {
        if (this.amount <= 0) throw new Error("Amount must be greater than zero");
    }

    approve(): void {
        this.status = PaymentStatusApproved
    }

    decline(): void {
        this.status = PaymentStatusDeclined
    }

    process(): void {
        if (this.amount >= 100) this.approve()
        else this.decline()
    }

    get Amount(): number {
        return this.amount;
    }

    get OrderID(): string {
        return this.orderID;
    }

    get Status(): string {
        return this.status;
    }
}