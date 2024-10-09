import { Sequelize } from "sequelize-typescript";
import ID from "../../@shared/domain/value-object/id.value-object";
import Client from "../domain/client.entity";
import Order from "../domain/order.entity";
import Product from "../domain/product.entity";
import CheckoutGateway from "../gateway/checkout.gateway";
import ClientModel from "./order-client.model";
import ProductModel from "./order-product.model";
import OrderModel from "./order.model";

export default class CheckoutRepository implements CheckoutGateway {
    constructor(private readonly sequelize: Sequelize) { }

    async addOrder(order: Order): Promise<void> {
        const trx = await this.sequelize.transaction()

        try {
            await ClientModel.create({
                id: order.Client.ID.Value,
                name: order.Client.Name,
                email: order.Client.Email,
                document: order.Client.Document,
                street: order.Client.Street,
                number: order.Client.Number,
                complement: order.Client.Complement,
                city: order.Client.City,
                state: order.Client.State,
                zipCode: order.Client.ZipCode,
                createdAt: order.Client.CreatedAt,
                updatedAt: order.Client.UpdatedAt
            }, {
                transaction: trx
            })

            await OrderModel.create({
                id: order.ID.Value,
                clientID: order.Client.ID.Value,
                products: order.Products.map((product) => ({
                    id: product.ID.Value,
                    name: product.Name,
                    description: product.Description,
                    salesPrice: product.PurchasePrice,
                })),
                status: order.Status,
            }, {
                transaction: trx
            })

            await trx.commit()
        } catch (error) {
            await trx.rollback()
            throw new Error(`failed to add order: ${error}`);
        }
    }
    async findOrder(id: string): Promise<Order | null> {
        const orderModel = await OrderModel.findOne({
            where: { id },
            include: [
                { model: ClientModel },
                { model: ProductModel },
            ],
        })
        
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
                purchasePrice: product.purchasePrice
            })),
            status: orderModel.status
        })
    }
}
