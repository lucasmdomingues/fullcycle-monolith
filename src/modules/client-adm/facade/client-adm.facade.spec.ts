import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "../repository/client.model";
import ClientRepository from "../repository/client.repository";
import AddClientUsecase from "../usecase/add-client/add-client.usecase";
import ClientAdmFacade from "./client-adm.facade";

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
        const repository = new ClientRepository()
        const usecase = new AddClientUsecase(repository)
        const facade = new ClientAdmFacade({
            addUsecase: usecase,
            findUsecase: null,
        })

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
})