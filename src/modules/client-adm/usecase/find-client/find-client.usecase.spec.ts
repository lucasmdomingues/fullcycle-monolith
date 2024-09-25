import ID from "../../../@shared/domain/value-object/id.value-object"
import Client from "../../domain/client.entity"
import FindClientUsecase from "./find-client.usecase"

const repositoryMock = () => {
    return {
        add: jest.fn(),
        find: jest.fn()
    }
}

const clientMock = new Client({
    id: new ID("1"),
    name: "Client 1",
    email: "x@x.com",
    document: "123",
    street: "abc",
    number: "123",
    complement: "abc",
    city: "abc",
    state: "abc",
    zipCode: "123"
})

describe("Find client usecase unit test", () => {
    it("should add a client", async () => {
        const repository = repositoryMock()
        repository.find.mockReturnValue(Promise.resolve(clientMock))

        const usecase = new FindClientUsecase(repository)

        const input = {
            id: clientMock.ID.Value
        }

        const output = await usecase.execute(input)
        expect(repository.find).toHaveBeenCalled()
        expect(output.id).toBe(clientMock.ID.Value)
        expect(output.name).toBe(clientMock.Name)
        expect(output.email).toBe(clientMock.Email)
    })
})
