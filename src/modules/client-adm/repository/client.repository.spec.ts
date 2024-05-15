import { Sequelize } from "sequelize-typescript"
import { ClientModel } from "./client.model"
import ClientRepository from "./client.repository"
import Client from "../domain/client.entity"
import ID from "../../@shared/domain/value-object/id.value-object"

describe('Product repository test', () => {
    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true, },
        })
        sequelize.addModels([ClientModel])
        await sequelize.sync()
    })

    afterEach(async () => {
        await sequelize.close()
    })

    it("should find a client", async () => {
        const client = await ClientModel.create({
            id: "1",
            name: "Client 1",
            email: "x@x.com",
            address: "Address 1",
            createdAt: new Date(),
            updatedAt: new Date()
        })

        const repository = new ClientRepository()

        const output = await repository.find(client.id)
        expect(output.ID.Value).toBe(client.id)
        expect(output.Name).toBe(client.name)
        expect(output.Email).toBe(client.email)
        expect(output.Address).toBe(client.address)
    })

    it('should create a client', async () => {
        const client = new Client({
            id: new ID("1"),
            name: "Client 1",
            email: "x@x.com",
            address: "Address 1",
            createdAt: new Date(),
            updatedAt: new Date()
        })

        const repository = new ClientRepository()
        await repository.add(client)

        const clientModel = await ClientModel.findOne({ where: { id: client.ID.Value } })

        expect(clientModel.id).toEqual(client.ID.Value)
        expect(clientModel.name).toEqual(client.Name)
        expect(clientModel.email).toEqual(client.Email)
        expect(clientModel.address).toEqual(client.Address)
        expect(clientModel.createdAt).toEqual(client.CreatedAt)
        expect(clientModel.updatedAt).toEqual(client.UpdatedAt)
    })
})