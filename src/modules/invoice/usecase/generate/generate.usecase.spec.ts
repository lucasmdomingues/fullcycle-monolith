import GenerateInvoiceUsecase from "./generate.usecase"

const repositoryMock = () => {
    return {
        find: jest.fn(),
        generate: jest.fn(),
    }
}

describe('Generate invoice usecase unit test', () => {
    it('should generate a invoice', async () => {
        const repository = repositoryMock()
        const usecase = new GenerateInvoiceUsecase(repository)

        const input = {
            name: "foo",
            document: "123",
            street: "test",
            number: "123",
            city: "test",
            complement: "test",
            state: "T",
            zipCode: "123",
            items: [
                {
                    id: "1",
                    name: 'test',
                    price: 10
                },
                {
                    id: "1",
                    name: 'test',
                    price: 10
                }
            ],
        }

        const output = await usecase.execute(input)
        expect(repository.generate).toHaveBeenCalled()
        expect(output.id).toBeDefined()
        expect(output.name).toBe(input.name)
        expect(output.document).toBe(input.document)
        expect(output.street).toBe(input.street)
        expect(output.number).toBe(input.number)
        expect(output.city).toBe(input.city)
        expect(output.complement).toBe(input.complement)
        expect(output.state).toBe(input.state)
        expect(output.zipCode).toBe(input.zipCode)
        expect(output.items).toHaveLength(input.items.length)
        expect(output.total).toBe(20)
    })
})
