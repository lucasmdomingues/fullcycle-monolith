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

        expect(data.id).toEqual(product.ID.Value)
        expect(data.name).toEqual(product.Name)
        expect(data.description).toEqual(product.Description)
        expect(data.purchasePrice).toEqual(product.PurchasePrice)
        expect(data.stock).toEqual(product.Stock)
    })

    it('should find a product', async () => {
        const product = new Product({
            id: new ID("1"),
            name: "Product 1",
            description: "Product 1 description",
            purchasePrice: 100,
            stock: 100
        })

        const repository = new ProductRepository()
        await repository.add(product)

        const data = await repository.find(product.ID.Value)

        expect(data.ID.Value).toEqual(product.ID.Value)
        expect(data.Name).toEqual(product.Name)
        expect(data.Description).toEqual(product.Description)
        expect(data.PurchasePrice).toEqual(product.PurchasePrice)
        expect(data.Stock).toEqual(product.Stock)
        expect(data.CreatedAt).toBeDefined()
        expect(data.UpdatedAt).toBeDefined()
    })

    it("should find all products", async () => {
        const productsMock = [
            {
                id: new ID("1").Value,
                name: "Product 1",
                description: "Desc 1",
                purchasePrice: 100,
                stock: 100,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: new ID("2").Value,
                name: "Product 2",
                description: "Desc 2",
                purchasePrice: 200,
                stock: 100,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ]

        await ProductModel.bulkCreate(productsMock)

        const repository = new ProductRepository()
        const products = await repository.findAll()

        expect(products).toHaveLength(2)

        products.forEach((product, i) => {
            expect(product.ID.Value).toBe(productsMock[i].id)
            expect(product.Name).toBe(productsMock[i].name)
            expect(product.Description).toBe(productsMock[i].description)
            expect(product.PurchasePrice).toBe(productsMock[i].purchasePrice)
        });
    })

    it("should find a product", async () => {
        const productMock = {
            id: new ID("1").Value,
            name: "Product 1",
            description: "Desc 1",
            purchasePrice: 100,
            stock: 10,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        await ProductModel.create(productMock)

        const repository = new ProductRepository()
        const product = await repository.find(productMock.id)

        expect(product.ID.Value).toBe(productMock.id)
        expect(product.Name).toBe(productMock.name)
        expect(product.Description).toBe(productMock.description)
        expect(product.PurchasePrice).toBe(productMock.purchasePrice)
        expect(product.Stock).toBe(productMock.stock)
        expect(product.CreatedAt).toBeDefined()
        expect(product.UpdatedAt).toBeDefined()
    })
})
