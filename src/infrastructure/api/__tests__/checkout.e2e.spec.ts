import { Sequelize } from "sequelize-typescript"
import { NewExpress, NewSequelize } from "../express"
import request from "supertest"
import Product from "../../../modules/checkout/domain/product.entity"

describe('E2E tests for clients', () => {
    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = await NewSequelize()
    })

    afterAll(async () => {
        await sequelize.close()
    })

    it('should place an order', async () => {
        const app = await NewExpress(sequelize)

        // Add client
        const createUserInput = {
            name: "Client 1",
            email: "x@x.com",
            document: "123",
            street: "abc",
            number: "123",
            complement: "abc",
            city: "abc",
            state: "abc",
            zipCode: "123"
        }

        let response = await request(app).post('/clients').send(createUserInput)
        expect(response.statusCode).toBe(200)
        expect(response.body.id).toBeDefined()

        const clientID = response.body.id

        // Add products
        let createProductInputs = [
            {
                id: "",
                name: "foo",
                description: "bar",
                purchasePrice: 100,
                stock: 10
            },
            {
                id: "",
                name: "foo 2",
                description: "bar 2",
                purchasePrice: 100,
                stock: 10
            }
        ]

        for (let p of createProductInputs) {
            response = await request(app).post('/products').send(p)
            expect(response.statusCode).toBe(200)
            expect(response.body.id).toBeDefined()
            p.id = response.body.id
        }


        const body = {
            clientID: clientID,
            products: createProductInputs.map((p) => ({ id: p.id }))
        }

        response = await request(app).post('/checkout').send(body)
        expect(response.statusCode).toBe(200)

        expect(response.body.id).toBeDefined()
        expect(response.body.invoiceID).toBeDefined()
        expect(response.body.status).toBe("approved")
        expect(response.body.total).toBe(200)
        expect(response.body.products).toHaveLength(createProductInputs.length)
    })
})
