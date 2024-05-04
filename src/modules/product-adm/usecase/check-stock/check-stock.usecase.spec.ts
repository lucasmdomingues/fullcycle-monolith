import ID from "../../../@shared/domain/value-object/id.value-object"
import Product from "../../domain/product.entity"
import CheckStockUsecase from "./check-stock.usecase"

const productMock = new Product({
    id: new ID('1'),
    name: "Product",
    description: "Product description",
    purchasePrice: 100,
    stock: 10
})

const repositoryMock = () => {
    return {
        add: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(productMock))
    }
}

describe('Check stock usecase unit test', () => {
    it("should get stock of a product", async () => {
        const repository = repositoryMock()
        const checkStockUsecase = new CheckStockUsecase(repository)

        const input = {
            productId: "1"
        }

        const output = await checkStockUsecase.execute(input)
        expect(repository.find).toHaveBeenCalled()
        expect(output.productId).toBe(productMock.ID.Value)
        expect(output.stock).toBe(productMock.Stock)
    })
})