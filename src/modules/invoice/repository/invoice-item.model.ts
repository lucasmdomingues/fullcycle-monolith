import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import InvoiceModel from "./invoice.model";

@Table({
    tableName: 'order_items',
    timestamps: false,
})
export default class InvoiceItemModel extends Model {
    @PrimaryKey
    @Column({ allowNull: false })
    id: string;

    @ForeignKey(() => InvoiceModel)
    @Column({ allowNull: false, field: "invoice_id" })
    invoiceID: string;

    @BelongsTo(() => InvoiceModel)
    invoice: InvoiceModel;

    @Column({ allowNull: false })
    name: string;

    @Column({ allowNull: false })
    price: number;
}