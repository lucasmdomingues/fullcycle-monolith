import { AddClientFacadeInputDTO } from "../../facade/client-adm.facade.interface"
import AddClientUsecase from "./add-client.usecase"
import { AddClientInputDTO } from "./add-client.usecase.dto"

const repositoryMock = () => {
    return {
        add: jest.fn(),
        find: jest.fn()
    }
}

describe('Add client usecase unit test', () => {
    it("should add a client", async () => {
        const repository = repositoryMock()
        const usecase = new AddClientUsecase(repository)

        const input: AddClientInputDTO = {
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

        const output = await usecase.execute(input)
        expect(repository.add).toHaveBeenCalled()
        expect(output.id).toBeDefined()
        expect(output.name).toBe(input.name)
        expect(output.email).toBe(input.email)
    })
})
