import { Sequelize } from "sequelize-typescript"
import ID from "../../@shared/domain/value-object/id.value-object"
import Product from "../domain/product.entity"
import ProductModel from "./product.model"
import ProductRepository from "./product.repository"

describe('Product repository test', () => {
    let sequelize: Sequelize

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

    afterEach(async () => {
        await sequelize.close()
    })

    it("should create a product", async () => {
        const product = new Product({
            id: new ID("1"),
            name: "Product 1",
            description: "Product 1 description",
            purchasePrice: 100,
            stock: 100
        })

        const repository = new ProductRepository()
        await repository.add(product)

        const data = await ProductModel.findOne({
            where: { id: product.ID.Value }
        })

        expect(data.toJSON()).toEqual({
            id: product.ID.Value,
            name: product.Name,
            description: product.Description,
            purchasePrice: product.PurchasePrice,
            stock: product.Stock,
            createdAt: product.CreatedAt,
            updatedAt: product.UpdatedAt
        })
    })

    it('should find a product', async () => {
        const product = new Product({
            id: new ID("1"),
            name: "Product 1",
            description: "Product 1 description",
            purchasePrice: 100,
            stock: 100
        })

        await ProductModel.create({
            id: product.ID.Value,
            name: product.Name,
            description: product.Description,
            purchasePrice: product.PurchasePrice,
            stock: product.Stock,
            createdAt: new Date(),
            updatedAt: new Date()
        })

        const repository = new ProductRepository()
        const data = await repository.find(product.ID.Value)

        expect(data.ID.Value).toEqual(product.ID.Value)
        expect(data.Name).toEqual(product.Name)
        expect(data.Description).toEqual(product.Description)
        expect(data.PurchasePrice).toEqual(product.PurchasePrice)
        expect(data.Stock).toEqual(product.Stock)
    })
})