import { Sequelize } from "sequelize-typescript"
import request from "supertest"
import { NewExpress, NewSequelize } from "../express"

describe('E2E tests for invoice', () => {
    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = await NewSequelize()
    })

    afterAll(async () => {
        await sequelize.close()
    })

    it('should find a invoice', async () => {
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

        // Place order
        const body = {
            clientID: clientID,
            products: createProductInputs.map((p) => ({ id: p.id }))
        }

        response = await request(app).post('/checkout').send(body)
        expect(response.statusCode).toBe(200)

        expect(response.body.invoiceID).toBeDefined()
        
        const invoiceID = response.body.invoiceID

        // Find invoice
        response = await request(app).get(`/invoice/${invoiceID}`)
        expect(response.statusCode).toBe(200)
        
        expect(response.body.id).toBe(invoiceID)
        expect(response.body.name).toBe(createUserInput.name)
        expect(response.body.document).toBe(createUserInput.document)
        expect(response.body.address.street).toBe(createUserInput.street)
        expect(response.body.address.number).toBe(createUserInput.number)
        expect(response.body.address.complement).toBe(createUserInput.complement)
        expect(response.body.address.city).toBe(createUserInput.city)
        expect(response.body.address.state).toBe(createUserInput.state)
        expect(response.body.address.zipCode).toBe(createUserInput.zipCode)
        expect(response.body.items).toHaveLength(createProductInputs.length)
        expect(response.body.total).toBe(200)
    })
})
