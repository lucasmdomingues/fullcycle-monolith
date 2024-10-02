import { ForeignKeyConstraintError } from "sequelize";
import Order from "../domain/order.entity";
import CheckoutGateway from "../gateway/checkout.gateway";
import OrderModel from "./order.model";
import ProductModel from "./product.model";

export default class CheckoutRepository implements CheckoutGateway {
    async addOrder(order: Order): Promise<void> {
        try {
            await OrderModel.create({
                id: order.ID.Value,
                clientID: order.Client.ID.Value,
                products: order.Products.map((product) => ({
                    id: product.ID.Value,
                    orderID: order.ID.Value,
                    name: product.Name,
                    description: product.Description,
                    salesPrice: product.SalesPrice
                })),
                status: order.Status,
            })
        } catch (error) {
            throw new Error(`failed to add order: ${error}`);
            
        }
    }
    async findOrder(id: string): Promise<Order | null> {
        throw new Error("Method not implemented.");
    }
}
