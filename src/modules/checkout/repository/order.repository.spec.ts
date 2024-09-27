import { Sequelize } from "sequelize-typescript"

describe('Order repository test', () => {
    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        })
        sequelize.addModels([])
        await sequelize.sync()
    })

    afterEach(async () => {
        await sequelize.close()
    })

    // it("should add a order", async () => {
    //     const client = new Client({
    //         id: new ID("1"),
    //         name: "Client 1",
    //         email: "x@x.com",
    //         document: "123",
    //         street: "test",
    //         number: "123",
    //         complement: "foo",
    //         city: "bar",
    //         state: "test",
    //         zipCode: "123",
    //     })

    //     const products = [
    //         new Product({
    //             id: new ID("1"),
    //             name: "Product 1",
    //             description: "Product 1 description",
    //             salesPrice: 100,
    //         }),
    //         new Product({
    //             id: new ID("2"),
    //             name: "Product 2",
    //             description: "Product 2 description",
    //             salesPrice: 200,
    //         }),
    //     ]

    //     const order = new Order({
    //         client: client,
    //         produts: products,
    //         id: new ID("1"),
    //         status: "approved"
    //     })

    //     const repository = new CheckoutRepository()
    //     await repository.addOrder(order)

    //     const orderModel = await OrderModel.findOne({ where: { id: order.ID.Value } })
    //     expect(orderModel.id).toBe(order.ID.Value)
    // })
})
