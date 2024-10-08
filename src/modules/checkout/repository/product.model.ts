import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import OrderModel from "./order.model";

@Table({
    tableName: 'order_products',
    timestamps: false,
})
export default class ProductModel extends Model {
    @PrimaryKey
    @Column({ allowNull: false })
    declare id: string;

    @ForeignKey(() => OrderModel)
    @Column({ allowNull: false, field: "order_id"})
    declare orderID: string;

    @BelongsTo(() => OrderModel)
    declare order: Awaited<OrderModel>;

    @Column({ allowNull: false })
    declare name: string;

    @Column({ allowNull: false })
    declare description: string;

    @Column({ allowNull: false, field: "sales_price" })
    declare salesPrice: number;
}
