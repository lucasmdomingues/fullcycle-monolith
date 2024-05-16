import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "../repository/client.model";
import ClientRepository from "../repository/client.repository";
import AddClientUsecase from "../usecase/add-client/add-client.usecase";
import ClientAdmFacade from "./client-adm.facade";
import FindClientUsecase from "../usecase/find-client/find-client.usecase";
import ClientAdmFacadeFactory from "./client-admn.facade.factory";

describe('Client ADM facade test', () => {
    let sequelize: Sequelize;

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

    afterEach(async () => await sequelize.close())

    it("should create a client", async () => {
        const facade = ClientAdmFacadeFactory.create()

        const input = {
            id: "1",
            name: "Client 1",
            email: "x@x.com",
            address: "address, 1"
        }

        await facade.add(input)

        const clientModel = await ClientModel.findOne({ where: { id: input.id } })

        expect(clientModel.id).toEqual(input.id)
        expect(clientModel.name).toEqual(input.name)
        expect(clientModel.email).toEqual(input.email)
        expect(clientModel.address).toEqual(input.address)
    })

    it("should find a client", async () => {
        const facade = ClientAdmFacadeFactory.create()

        const input = {
            id: "1",
            name: "Client 1",
            email: "x@x.com",
            address: "address, 1"
        }

        await facade.add(input)

        const output = await facade.find({ id: input.id })
        expect(output).toBeDefined()
        expect(output.id).toEqual(input.id)
        expect(output.name).toEqual(input.name)
        expect(output.email).toEqual(input.email)
        expect(output.address).toEqual(input.address)
    })
})