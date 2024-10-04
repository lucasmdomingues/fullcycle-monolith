import ID from "../../@shared/domain/value-object/id.value-object";
import Client from "../domain/client.entity";
import Order from "../domain/order.entity";
import Product from "../domain/product.entity";
import CheckoutGateway from "../gateway/checkout.gateway";
import ClientModel from "./order-client.model";
import OrderModel from "./order.model";
import ProductModel from "./order-product.model";

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
        const orderModel = await OrderModel.findOne({ where: { id }, include: [{ model: ClientModel }, { model: ProductModel }] })
        if (!orderModel) return null

        return new Order({
            id: new ID(orderModel.id),
            client: new Client({
                id: new ID(orderModel.clientID),
                name: orderModel.client.name,
                email: orderModel.client.email,
                document: orderModel.client.document,
                street: orderModel.client.street,
                number: orderModel.client.number,
                complement: orderModel.client.complement,
                city: orderModel.client.city,
                state: orderModel.client.state,
                zipCode: orderModel.client.zipCode,
            }),
            produts: orderModel.products.map((product) => new Product({
                id: new ID(product.id),
                name: product.name,
                description: product.description,
                salesPrice: product.salesPrice
            })),
            status: orderModel.status
        })
    }
}
