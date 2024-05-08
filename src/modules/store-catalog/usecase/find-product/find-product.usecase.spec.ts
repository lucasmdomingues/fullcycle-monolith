import ID from "../../../@shared/domain/value-object/id.value-object"
import Product from "../../domain/product.entity"
import FindProductUsecase from "./find-product.usecase"

const productMock = new Product({
    id: new ID("1"),
    name: "Product 1",
    description: "Desc 1",
    salesPrice: 100
})

const repositoryMock = () => {
    return {
        findAll: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(productMock))
    }
}

describe('find a product usecase unit test', () => {
    it('should find a product', async () => {
        const repository = repositoryMock()
        const usecase = new FindProductUsecase(repository)

        const input = {
            id: '1'
        }

        const output = await usecase.execute(input)
        expect(repository.find).toHaveBeenCalled()
        expect(output.id).toBe(productMock.ID.Value)
        expect(output.name).toBe(productMock.Name)
        expect(output.description).toBe(productMock.Description)
        expect(output.salesPrice).toBe(productMock.SalesPrice)
    })
})