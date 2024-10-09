import { Sequelize } from "sequelize-typescript"
import ID from "../../@shared/domain/value-object/id.value-object"
import Client from "../domain/client.entity"
import Order from "../domain/order.entity"
import Product from "../domain/product.entity"
import OrderClientModel from "./order-client.model"
import OrderProductModel from "./order-product.model"
import OrderModel from "./order.model"
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
        sequelize.addModels([OrderModel, OrderProductModel, OrderClientModel])
        await sequelize.sync()
    })

    afterEach(async () => {
        await sequelize.close()
    })

    it("should add a order", async () => {
        const client = new Client({
            id: new ID(),
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

        const products = [
            new Product({
                id: new ID(),
                name: "Product 1",
                description: "Product 1 description",
                purchasePrice: 100,
            }),
            new Product({
                id: new ID(),
                name: "Product 2",
                description: "Product 2 description",
                purchasePrice: 200,
            }),
        ]

        const order = new Order({
            id: new ID(),
            client: client,
            produts: products,
            status: "approved"
        })

        const repository = new CheckoutRepository(sequelize)
        await repository.addOrder(order)

        const orderModel = await OrderModel.findOne({
            where: { id: order.ID.Value },
            include: [
                { model: OrderProductModel },
                { model: OrderClientModel }
            ]
        })

        expect(orderModel.id).toStrictEqual(order.ID.Value)
        expect(orderModel.status).toBe(order.Status)

        expect(orderModel.client.id).toBe(order.Client.ID.Value)
        expect(orderModel.client.name).toBe(order.Client.Name)
        expect(orderModel.client.email).toBe(order.Client.Email)
        expect(orderModel.client.document).toBe(order.Client.Document)
        expect(orderModel.client.street).toBe(order.Client.Street)
        expect(orderModel.client.number).toBe(order.Client.Number)
        expect(orderModel.client.complement).toBe(order.Client.Complement)
        expect(orderModel.client.city).toBe(order.Client.City)
        expect(orderModel.client.state).toBe(order.Client.State)
        expect(orderModel.client.zipCode).toBe(order.Client.ZipCode)

        orderModel.products.forEach((product, i) => {
            expect(product.id).toBe(order.Products[i].ID.Value)
            expect(product.name).toBe(order.Products[i].Name)
            expect(product.description).toBe(order.Products[i].Description)
            expect(product.purchasePrice).toBe(order.Products[i].PurchasePrice)
        })
    })

    it("should find a order", async () => {
        const client = new Client({
            id: new ID(),
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

        const products = [
            new Product({
                id: new ID(),
                name: "Product 1",
                description: "Product 1 description",
                purchasePrice: 100,
            }),
            new Product({
                id: new ID(),
                name: "Product 2",
                description: "Product 2 description",
                purchasePrice: 200,
            }),
        ]

        const order = new Order({
            id: new ID(),
            client: client,
            produts: products,
            status: "approved"
        })

        const repository = new CheckoutRepository(sequelize)
        await repository.addOrder(order)

        const output = await repository.findOrder(order.ID.Value)
        expect(output.ID).toStrictEqual(order.ID)
        expect(output.Status).toBe(order.Status)

        expect(output.Client.ID).toStrictEqual(order.Client.ID)
        expect(output.Client.Name).toStrictEqual(order.Client.Name)
        expect(output.Client.Email).toStrictEqual(order.Client.Email)
        expect(output.Client.Document).toStrictEqual(order.Client.Document)
        expect(output.Client.Street).toStrictEqual(order.Client.Street)
        expect(output.Client.Number).toStrictEqual(order.Client.Number)
        expect(output.Client.Complement).toStrictEqual(order.Client.Complement)
        expect(output.Client.City).toStrictEqual(order.Client.City)
        expect(output.Client.State).toStrictEqual(order.Client.State)
        expect(output.Client.ZipCode).toStrictEqual(order.Client.ZipCode)

        output.Products.forEach((product, i) => {
            expect(product.ID).toStrictEqual(order.Products[i].ID)
            expect(product.Name).toStrictEqual(order.Products[i].Name)
            expect(product.Description).toStrictEqual(order.Products[i].Description)
            expect(product.PurchasePrice).toStrictEqual(order.Products[i].PurchasePrice)
        })
    })
})
