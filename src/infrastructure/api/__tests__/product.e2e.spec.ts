import { Sequelize } from "sequelize-typescript"
import { NewExpress, NewSequelize } from "../express"
import request from "supertest"

describe('E2E tests for products', () => {
    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = await NewSequelize()
    })

    afterAll(async () => {
        await sequelize.close()
    })

    it('should add a product', async () => {
        const app = await NewExpress(sequelize)

        const body = {
            name: "foo",
            description: "bar",
            purchasePrice: 100,
            stock: 10
        }

        const response = await request(app).post('/products').send(body)
        expect(response.statusCode).toBe(200)
        expect(response.body.id).toBeDefined()
        expect(response.body.name).toBe(body.name)
        expect(response.body.description).toBe(body.description)
        expect(response.body.purchasePrice).toBe(body.purchasePrice)
        expect(response.body.stock).toBe(body.stock)
    })
})
