import { Sequelize } from "sequelize-typescript";
import ProductAdmFacadeFactory from "../factory/facade.factory";
import ProductModel from "../repository/product.model";
import ID from "../../@shared/domain/value-object/id.value-object";

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

    it('should find a product', async () => {
        const facade = ProductAdmFacadeFactory.create()

        const input = {
            id: "1",
            name: "Product 1",
            description: "Product 1 description",
            purchasePrice: 10,
            stock: 10
        }
        
        await facade.addProduct(input)

        const output = await facade.find({ id: input.id })
        expect(output.id).toBe(input.id)
        expect(output.name).toBe(input.name)
        expect(output.description).toBe(input.description)
        expect(output.purchasePrice).toBe(input.purchasePrice)
    })
    
    it('should find products', async () => {
        const productsMock = [
            {
                id: new ID("1").Value,
                name: "Product 1",
                description: "Desc 1",
                purchasePrice: 100,
                stock: 10,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: new ID("2").Value,
                name: "Product 2",
                description: "Desc 2",
                purchasePrice: 200,
                stock: 10,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ]

        await ProductModel.bulkCreate(productsMock)

        const facade = ProductAdmFacadeFactory.create()

        const output = await facade.findAll()
        expect(output.products).toHaveLength(2)

        output.products.forEach((product, i)=> {
            expect(product.id).toBe(productsMock[i].id)
            expect(product.name).toBe(productsMock[i].name)
            expect(product.description).toBe(productsMock[i].description)
            expect(product.purchasePrice).toBe(productsMock[i].purchasePrice)
            expect(product.stock).toBe(productsMock[i].stock)
        })
    })
})
