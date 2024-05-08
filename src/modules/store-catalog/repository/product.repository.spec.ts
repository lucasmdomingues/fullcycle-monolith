import { Sequelize } from "sequelize-typescript";
import ID from "../../@shared/domain/value-object/id.value-object";
import ProductModel from "./product.model";
import ProductRepository from "./product.repository";

describe("Product repository test", () => {
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

    it("should find all products", async () => {
        const productsMock = [
            {
                id: new ID("1").Value,
                name: "Product 1",
                description: "Desc 1",
                salesPrice: 100
            },
            {
                id: new ID("2").Value,
                name: "Product 2",
                description: "Desc 2",
                salesPrice: 200
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
            expect(product.SalesPrice).toBe(productsMock[i].salesPrice)
        });
    })

    it("should find a product", async () => {
        const productMock = {
            id: new ID("1").Value,
            name: "Product 1",
            description: "Desc 1",
            salesPrice: 100
        }
        
        await ProductModel.create(productMock)

        const repository = new ProductRepository()
        const product = await repository.find(productMock.id)
        
        expect(product.ID.Value).toBe(productMock.id)
        expect(product.Name).toBe(productMock.name)
        expect(product.Description).toBe(productMock.description)
        expect(product.SalesPrice).toBe(productMock.salesPrice)
    })
})