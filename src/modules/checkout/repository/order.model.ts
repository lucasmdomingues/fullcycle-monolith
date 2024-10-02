import { BelongsTo, Column, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript"
import ProductModel from "./product.model";
import ClientModel from "./client.model";

@Table({
    tableName: 'orders',
    timestamps: false,
})
export default class OrderModel extends Model {
    @PrimaryKey
    @Column({ allowNull: false })
    declare id: string;

    @HasMany(() => ProductModel)
    declare products: ProductModel[];

    @ForeignKey(() => ClientModel)
    @Column({ allowNull: false, field: "client_id" })
    declare clientID: string;

    @BelongsTo(() => ClientModel)
    declare client: ClientModel;

    @Column({ allowNull: false })
    declare status: string;
}
