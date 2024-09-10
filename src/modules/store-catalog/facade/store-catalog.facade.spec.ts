import { Sequelize } from "sequelize-typescript";
import ProductModel from "../repository/product.model";
import StoreCatalogFacadeFactory from "../factory/facade.factory";
import ID from "../../@shared/domain/value-object/id.value-object";

describe("Product facade test", () => {
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

    it('should find a product', async () => {
        const facade = StoreCatalogFacadeFactory.create()

        const productMock = {
            id: '1',
            name: 'Product 1',
            description: 'Desc 1',
            salesPrice: 100
        }
        await ProductModel.create(productMock)

        const output = await facade.find({ id: productMock.id })
        expect(output.id).toBe(productMock.id)
        expect(output.name).toBe(productMock.name)
        expect(output.description).toBe(productMock.description)
        expect(output.salesPrice).toBe(productMock.salesPrice)
    })
    
    it('should find products', async () => {
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

        const facade = StoreCatalogFacadeFactory.create()

        const output = await facade.findAll()
        expect(output.products).toHaveLength(2)

        output.products.forEach((product, i)=> {
            expect(product.id).toBe(productsMock[i].id)
            expect(product.name).toBe(productsMock[i].name)
            expect(product.description).toBe(productsMock[i].description)
            expect(product.salesPrice).toBe(productsMock[i].salesPrice)
        })
    })
})
