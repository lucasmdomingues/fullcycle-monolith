import { Sequelize } from "sequelize-typescript"
import { NewExpress, NewSequelize } from "../express"
import request from "supertest"

describe('E2E tests for clients', () => {
    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = await NewSequelize()
    })

    afterAll(async () => {
        await sequelize.close()
    })

    it('should place an order', async () => {
        const app = await NewExpress()

        const products: any = []

        const body = {
            clientID: "1",
            products: products
        }

        // find a client
        // get all products
        // process payment
        // generate invoice

        const response = await request(app).post('/clients').send(body)
        expect(response.statusCode).toBe(200)
        
        expect(response.body.id).toBeDefined()
        expect(response.body.invoiceID).not.toBeNull()
        expect(response.body.status).toBe("approved")
        expect(response.body.total).toBe(0)
        expect(response.body.products).toStrictEqual(products)
    })
})
