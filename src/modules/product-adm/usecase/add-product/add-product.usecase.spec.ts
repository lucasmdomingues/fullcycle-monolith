import AddProductUsecase from "./add-product.usecase"

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn()
    }
}

describe('Add product usecase unit test', () => {
    it('should add a product', async () => {
        const repository = MockRepository()
        const usecase = new AddProductUsecase(repository)

        const input = {
            name: "Product 1",
            description: "Product 1 description",
            purchasePrice: 100,
            stock: 100
        }

        const output = await usecase.execute(input)

        expect(repository.add).toHaveBeenCalled()
        expect(output.id).toBeDefined()
        expect(output.name).toBe(input.name)
        expect(output.description).toBe(input.description)
        expect(output.purchasePrice).toBe(input.purchasePrice)
        expect(output.stock).toBe(input.stock)
    })
})