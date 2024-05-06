import { Sequelize } from "sequelize-typescript";
import ProductAdmFacadeFactory from "../factory/facade.factory";
import ProductModel from "../repository/product.model";

describe('Product ADM facade test', () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true, },
        })
        sequelize.addModels([ProductModel])
        await sequelize.sync()
    })

    afterEach(async () => await sequelize.close())


    it("should create a product", async () => {
        const facade = ProductAdmFacadeFactory.create()

        const input = {
            id: "1",
            name: "Product 1",
            description: "Product 1 description",
            purchasePrice: 10,
            stock: 10
        }

        await facade.addProduct(input)

        const product = await ProductModel.findOne({ where: { id: input.id } })
        expect(product).toBeDefined()
        expect(product.id).toBe(input.id)
        expect(product.name).toBe(input.name)
        expect(product.description).toBe(input.description)
        expect(product.purchasePrice).toBe(input.purchasePrice)
        expect(product.stock).toBe(input.stock)
    })

    it("should check product stock", async () => {
        const facade = ProductAdmFacadeFactory.create()

        const input = {
            id: "1",
            name: "Product 1",
            description: "Product 1 description",
            purchasePrice: 10,
            stock: 10
        }

        await facade.addProduct(input)

        const output = await facade.checkStock({ productId: input.id })
        expect(output.productId).toBe(input.id)
        expect(output.stock).toBe(input.stock)
    })
})