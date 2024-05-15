import AddClientUsecase from "./add-client.usecase"

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

        const input = {
            name: "Client 1",
            email: "x@x.com",
            address: "Address, 1"
        }

        const output = await usecase.execute(input)
        expect(repository.add).toHaveBeenCalled()
        expect(output.id).toBeDefined()
        expect(output.name).toBe(input.name)
        expect(output.email).toBe(input.email)
        expect(output.address).toBe(input.address)
    })
})