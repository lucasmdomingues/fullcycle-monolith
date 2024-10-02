import { Sequelize } from "sequelize-typescript"
import OrderModel from "./order.model"
import ClientModel from "./client.model"
import ProductModel from "./product.model"
import Client from "../domain/client.entity"
import ID from "../../@shared/domain/value-object/id.value-object"
import Product from "../domain/product.entity"
import Order from "../domain/order.entity"
import CheckoutRepository from "./order.repository"

describe('Order repository test', () => {
    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        })
        sequelize.addModels([OrderModel, ProductModel, ClientModel])
        await sequelize.sync()
    })

    afterEach(async () => {
        await sequelize.close()
    })

    it("should add a order", async () => {
        const client = new Client({
            id: new ID("1c"),
            name: "Client 1",
            email: "x@x.com",
            document: "123",
            street: "test",
            number: "123",
            complement: "foo",
            city: "bar",
            state: "test",
            zipCode: "123",
        })

        await ClientModel.create({
            id: client.ID.Value,
            name: client.Name,
            email: client.Email,
            document: client.Document,
            street: client.Street,
            number: client.Number,
            complement: client.Complement,
            city: client.City,
            state: client.State,
            zipCode: client.ZipCode
        })

        const products = [
            new Product({
                id: new ID("1p"),
                name: "Product 1",
                description: "Product 1 description",
                salesPrice: 100,
            }),
            new Product({
                id: new ID("2p"),
                name: "Product 2",
                description: "Product 2 description",
                salesPrice: 200,
            }),
        ]

        const order = new Order({
            id: new ID("1o"),
            client: client,
            produts: products,
            status: "approved"
        })

        const repository = new CheckoutRepository()
        await repository.addOrder(order)

        const orderModel = await OrderModel.findOne({
            where: { id: order.ID.Value },
            include: [
                { model: ClientModel },
                { model: ProductModel }
            ]
        })
        expect(orderModel.id).toBe(order.ID.Value)
        expect(orderModel.client.id).toBe(order.Client.ID.Value)
        orderModel.products.forEach((product, i) => expect(product.id).toBe(order.Products[i].ID.Value))
    })
})
