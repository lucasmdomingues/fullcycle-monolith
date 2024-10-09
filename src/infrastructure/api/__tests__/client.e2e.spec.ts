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

    it('should add a client', async () => {
        const app = await NewExpress(sequelize)

        const body = {
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

        const response = await request(app).post('/clients').send(body)
        expect(response.statusCode).toBe(200)
        expect(response.body.id).toBeDefined()
        expect(response.body.name).toBe(body.name)
        expect(response.body.email).toBe(body.email)
        expect(response.body.document).toBe(body.document)
        expect(response.body.street).toBe(body.street)
        expect(response.body.number).toBe(body.number)
        expect(response.body.complement).toBe(body.complement)
        expect(response.body.city).toBe(body.city)
        expect(response.body.state).toBe(body.state)
        expect(response.body.zipCode).toBe(body.zipCode)
        expect(response.body.createdAt).toBeDefined()
        expect(response.body.updatedAt).toBeDefined()
    })
})
